import type { Metadata } from "next"
import { cache } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { formatArticleDate } from "@/lib/media-navigation"
import { getNews, type News } from "@/lib/microcms/news"
import { COMPANY_NAME, DEFAULT_OG_IMAGE, SITE_BRAND, SITE_URL, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo"

export const revalidate = 60

const FALLBACK_DESCRIPTION = "株式会社Lat91からのお知らせです。"

const loadNews = cache((id: string, draftKey?: string) => getNews(id, draftKey))

type Params = Promise<{ id: string }>

// 一度も公開していない下書きは publishedAt が無いことがある
const newsDate = (news: News) => news.publishedAt ?? news.updatedAt
type SearchParams = Promise<{ draftKey?: string }>

function buildDescription(news: News): string {
  const stripped = (news.body || "")
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
  return stripped.length > 0 ? stripped.slice(0, 160) : FALLBACK_DESCRIPTION
}

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const { id } = await params
  const { draftKey } = await searchParams
  const news = await loadNews(id, draftKey)

  if (!news) {
    return { title: `お知らせが見つかりません | ${SITE_BRAND}`, robots: { index: false, follow: false } }
  }

  const url = `${SITE_URL}/news/${id}`
  const description = buildDescription(news)
  return {
    title: { absolute: `${news.title} | ${SITE_BRAND} お知らせ` },
    description,
    alternates: { canonical: url },
    // 下書きのプレビューは検索に出さない
    robots: draftKey ? { index: false, follow: false } : undefined,
    openGraph: {
      title: news.title,
      description,
      url,
      siteName: COMPANY_NAME,
      type: "article",
      locale: "ja_JP",
      publishedTime: newsDate(news),
      modifiedTime: news.updatedAt,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: news.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

export default async function NewsDetailPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params
  const { draftKey } = await searchParams
  const news = await loadNews(id, draftKey)
  if (!news) notFound()

  const path = `/news/${id}`

  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({ path, name: news.title, description: buildDescription(news) }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "お知らせ", path: "/news" },
            { name: news.title, path },
          ]),
        ]}
      />

      <section className="pt-32 pb-10 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            お知らせ一覧へ戻る
          </Link>

          <p className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Calendar size={14} />
            <time dateTime={newsDate(news)}>{formatArticleDate(newsDate(news))}</time>
          </p>

          <h1 className="text-[clamp(28px,4.5vw,44px)] font-bold text-neutral-900 leading-[1.3]">
            {news.title}
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto border-t border-neutral-100 pt-10">
          {news.body ? (
            <div className="article-html-body" dangerouslySetInnerHTML={{ __html: news.body }} />
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
}
