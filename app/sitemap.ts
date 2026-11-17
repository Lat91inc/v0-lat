import type { MetadataRoute } from "next"
import { getSitemapArticles } from "@/lib/microcms/articles"
import { getSitemapNews } from "@/lib/microcms/news"

const BASE_URL = "https://www.lat91.co.jp"

// 本番（Vercel）では sitemap の revalidate が効かず、最初に作った結果を出し続ける（2026-11-17 実測）。
// 毎回その場で作り、CDN のキャッシュは next.config.mjs の Cache-Control（5分）に任せる。
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, news] = await Promise.all([getSitemapArticles(), getSitemapNews()])
  const lastModified = new Date("2026-05-08")

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/service`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/baramaki-ai`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/insta-lead-ai`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/talksite-ai`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/treal`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/maneku-ai`, lastModified: new Date("2026-10-02"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/company`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/media`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/philosophy`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/media/${a.id}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // お知らせが0件のあいだは /news も載せない（中身の無いページを検索に出さない）
  const newsIndex: MetadataRoute.Sitemap = news.length > 0
    ? [{ url: `${BASE_URL}/news`, lastModified: new Date(news[0].updatedAt || news[0].publishedAt), changeFrequency: "weekly", priority: 0.6 }]
    : []
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE_URL}/news/${n.id}`,
    lastModified: new Date(n.updatedAt || n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  return [...staticRoutes, ...articleRoutes, ...newsIndex, ...newsRoutes]
}
