#!/usr/bin/env python3
"""Public-only indexing health check. No CMS credentials or third-party packages."""
import argparse
import json
import sys
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.articles = set()
        self.next = None
        self.canonical = None
        self.noindex = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        href = a.get('href', '')
        path = urllib.parse.urlsplit(href).path
        if tag == 'a' and path.startswith('/media/') and path.count('/') == 2:
            self.articles.add(path.removeprefix('/media/'))
        if tag == 'a' and 'next' in a.get('rel', '').split():
            self.next = href
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = href
        if tag == 'meta' and a.get('name', '').lower() in ('robots', 'googlebot'):
            self.noindex |= 'noindex' in a.get('content', '').lower()


def audit(base, canonical_origin):
    def get(path):
        url = urllib.parse.urljoin(base + '/', path)
        assert urllib.parse.urlsplit(url).netloc == urllib.parse.urlsplit(base).netloc, 'Unexpected external pagination link'
        req = urllib.request.Request(url, headers={'User-Agent': 'Lat91-Indexing-Health/1.0'})
        with urllib.request.urlopen(req, timeout=45) as response:
            assert response.status == 200, f'{path}: HTTP {response.status}'
            assert 'noindex' not in response.headers.get('X-Robots-Tag', '').lower(), f'{path}: X-Robots-Tag noindex'
            return response.read().decode('utf-8')

    def inventory():
        data = json.loads(get('/api/media'))
        assert isinstance(data.get('totalCount'), int) and data['totalCount'] > 0, 'CMS public API missing positive totalCount'
        latest = {a['id'] for a in data['contents']}
        assert latest, 'CMS public API missing latest articles'
        return data['totalCount'], latest

    total, latest = inventory()
    root = ET.fromstring(get('/sitemap.xml'))
    urls = [n.text for n in root.findall('.//{*}loc')]
    article_urls = [u for u in urls if urllib.parse.urlsplit(u).path.startswith('/media/')]
    sitemap_ids = {urllib.parse.urlsplit(u).path.removeprefix('/media/') for u in article_urls}
    assert len(article_urls) == len(sitemap_ids) == total, f'Sitemap: {len(sitemap_ids)} articles; CMS: {total}'
    assert latest <= sitemap_ids, 'Latest articles missing from sitemap'
    home = Page(get('/'))
    assert not home.noindex and latest <= home.articles, 'Homepage missing latest server-rendered links or noindex'
    seen, visited = set(), set()
    path = '/media'
    while path:
        assert path not in visited and len(visited) < 1000, 'Pagination loop or excessive page count'
        visited.add(path)
        page = Page(get(path))
        assert not page.noindex, f'{path}: noindex'
        assert page.canonical == canonical_origin + path, f'{path}: wrong canonical {page.canonical}'
        assert page.articles, f'{path}: no article links in HTML'
        assert not seen.intersection(page.articles), f'{path}: duplicate articles across pages'
        seen.update(page.articles)
        path = page.next
    assert seen == sitemap_ids, f'Listing reaches {len(seen)} / {len(sitemap_ids)} sitemap articles'
    for article_id in sorted(latest):
        path = '/media/' + article_id
        html = get(path)
        page = Page(html)
        assert not page.noindex and page.canonical == canonical_origin + path, f'{path}: robots/canonical problem'
        assert 'article-html-body' in html, f'{path}: article body missing'
    assert inventory() == (total, latest), 'CMS changed during audit; retry for consistent snapshot'
    return {'status': 'pass', 'cms_articles': total, 'sitemap_articles': len(sitemap_ids), 'reachable_articles': len(seen), 'listing_pages': len(visited), 'latest_articles_checked': sorted(latest)}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default='https://www.lat91.co.jp')
    parser.add_argument('--canonical-origin', default='https://www.lat91.co.jp')
    parser.add_argument('--attempts', type=int, default=3)
    parser.add_argument('--retry-delay', type=int, default=75)
    args = parser.parse_args()
    for attempt in range(args.attempts):
        try:
            print(json.dumps(audit(args.base_url.rstrip('/'), args.canonical_origin.rstrip('/')), ensure_ascii=False))
            sys.exit(0)
        except Exception as error:
            print(f'Attempt {attempt + 1}/{args.attempts}: {error}', file=sys.stderr)
            if attempt + 1 < args.attempts:
                time.sleep(args.retry_delay)
    sys.exit(1)
