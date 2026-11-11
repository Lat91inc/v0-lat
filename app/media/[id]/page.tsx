import { formatArticleDate } from "@/lib/media-navigation"
import type { Metadata } from "next"
import { cache } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from "lucide-react"
import { client, type Article } from "@/lib/microcms/client"
import { notFound } from "next/navigation"
import {
  COMPANY_NAME,
  DEFAULT_OG_IMAGE,
  SITE_BRAND,
  SITE_URL,
  articleJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo"

export const revalidate = 60

const FALLBACK_DESCRIPTION =
  "Lat91のメディア記事。AIエージェント・生成AI・DX推進に関する実践的な知見を発信します。"

const getArticle = cache(async (id: string, draftKey?: string): Promise<Article | null> => {
  if (!client) throw new Error("microCMS is not configured")
  try {
    const article = await client.get<Article>({
      endpoint: "media",
      contentId: id,
      queries: draftKey ? { draftKey } : {},
      customRequestInit: draftKey ? { cache: "no-store" } : { next: { revalidate: 60 } },
    })
    return article
  } catch (error) {
    if (error instanceof Error && /^fetch API response status: 404(?:\s|$)/.test(error.message)) return null
    throw new Error("Failed to load article from microCMS")
  }
})

function buildDescription(article: Article): string {
  if (article.summary && article.summary.trim().length > 0) {
    return article.summary.trim().slice(0, 160)
  }
  const source = article.htmlBody || article.body || ""
  const stripped = source
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
  if (stripped.length > 0) return stripped.slice(0, 160)
  return FALLBACK_DESCRIPTION
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ draftKey?: string }>
}): Promise<Metadata> {
  const { id } = await params
  const { draftKey } = await searchParams
  const article = await getArticle(id, draftKey)

  if (!article) {
    return {
      title: `記事が見つかりません | ${SITE_BRAND}`,
      robots: { index: false, follow: false },
    }
  }

  const url = `${SITE_URL}/media/${id}`
  const description = buildDescription(article)
  const fullTitle = `${article.title} | ${SITE_BRAND} Media`
  const image = article.thumbnail?.url || DEFAULT_OG_IMAGE
  const ogImages = [
    {
      url: image,
      width: article.thumbnail?.width || 1200,
      height: article.thumbnail?.height || 630,
      alt: article.title,
    },
  ]

  // Draftプレビューはインデックスさせない
  const robots = draftKey ? { index: false, follow: false } : undefined

  return {
    // absoluteを使ってlayoutのtitle templateをバイパス
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      title: article.title,
      description,
      url,
      siteName: COMPANY_NAME,
      type: "article",
      locale: "ja_JP",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [image],
    },
  }
}

async function getRelatedArticles(currentId: string, category: string): Promise<Article[]> {
  if (!client) return []
  try {
    const data = await client.getList<Article>({
      endpoint: "media",
      queries: {
        filters: `category[contains]${category}`,
        limit: 3,
        orders: "-publishedAt",
      },
    })
    return data.contents.filter((a) => a.id !== currentId).slice(0, 2)
  } catch {
    return []
  }
}



export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ draftKey?: string }>
}) {
  const { id } = await params
  const { draftKey } = await searchParams
  const article = await getArticle(id, draftKey)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(id, article.category?.[0] || "")
  const description = buildDescription(article)
  const articlePath = `/media/${id}`
  const articleUrl = `${SITE_URL}${articlePath}`
  const categoryLabel = article.category?.join(" / ") || "Media"
  const encodedArticleUrl = encodeURIComponent(articleUrl)
  const encodedArticleTitle = encodeURIComponent(article.title)

  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({
            path: articlePath,
            name: article.title,
            description,
          }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "メディア", path: "/media" },
            { name: article.title, path: articlePath },
          ]),
          articleJsonLd({
            path: articlePath,
            headline: article.title,
            description,
            image: article.thumbnail?.url,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
          }),
        ]}
      />

      {/* Article Header */}
      <section className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            メディア一覧へ戻る
          </Link>

          <span className="inline-block px-4 py-2 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600 mb-6">
            {categoryLabel}
          </span>

          <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-neutral-900 leading-[1.2] mb-8">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {formatArticleDate(article.publishedAt)}
            </span>
            {article.readingTime && (
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {article.readingTime} min
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[16/8] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden">
            {article.thumbnail ? (
              <img
                src={article.thumbnail.url}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase">
                  {categoryLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content (Rich Editor HTML) */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="article-html-body"
            dangerouslySetInnerHTML={{ __html: article.htmlBody || article.body || "" }}
          />

          {/* Share */}
          <div className="mt-16 pt-8 border-t border-neutral-100">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-sm text-neutral-400">
                <Share2 size={14} />
                共有
              </span>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedArticleUrl}&text=${encodedArticleTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Xで記事を共有"
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedArticleUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedInで記事を共有"
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="px-6 md:px-12 pb-32 bg-neutral-50">
          <div className="max-w-6xl mx-auto pt-24">
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 mb-10">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/media/${related.id}`}>
                  <article className="group h-full bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                    <span className="text-xs font-medium text-neutral-400">
                      {related.category}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-neutral-900 leading-relaxed group-hover:text-neutral-600 transition-colors">
                      {related.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
