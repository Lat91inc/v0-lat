import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { MediaArticles } from "@/components/media-articles"
import { getArticleCards } from "@/lib/microcms/articles"
import { MEDIA_PAGE_SIZE, mediaPageHref, parseMediaQuery } from "@/lib/media-navigation"
import { notFound } from "next/navigation"
import Link from "next/link"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

export const revalidate = 60

const description =
  "株式会社Lat91のメディア。AIエージェント、生成AI、DX推進、業務自動化に関する実践的な知見と最新動向を発信します。"

type MediaSearchParams = Promise<{ page?: string | string[]; category?: string | string[] }>

export async function generateMetadata({ searchParams }: { searchParams: MediaSearchParams }) {
  const query = parseMediaQuery(await searchParams)
  if (!query) notFound()
  const suffix = query.page > 1 ? `（${query.page}ページ目）` : ""
  return createPageMetadata({
    title: `${query.category === "all" ? "AIエージェント・生成AI・DXメディア" : query.category}${suffix}`,
    description,
    path: mediaPageHref(query.page, query.category),
  })
}

export default async function MediaPage({ searchParams }: { searchParams: MediaSearchParams }) {
  const query = parseMediaQuery(await searchParams)
  if (!query) notFound()
  const { page, category } = query
  const data = await getArticleCards(page, category)
  const pageCount = Math.max(1, Math.ceil(data.totalCount / MEDIA_PAGE_SIZE))
  if (page > pageCount) notFound()
  const articles = data.contents

  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({
            path: mediaPageHref(page, category),
            name: "AIエージェント・生成AI・DXメディア",
            description,
          }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "メディア", path: "/media" },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-neutral-900" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
              Media
            </span>
          </span>
          <h1 className="text-[clamp(36px,6vw,64px)] font-bold text-neutral-900 leading-[1.1] tracking-tight">
            AIエージェント・生成AIメディア
          </h1>
          <p className="mt-6 text-lg text-neutral-500 max-w-xl">
            AI時代のビジネス変革に関する知見と、Lat91の最新情報をお届けします。
          </p>
        </div>
      </section>

      <MediaArticles articles={articles} activeCategory={category} />

      {pageCount > 1 && (
        <nav aria-label="記事一覧のページ送り" className="flex items-center justify-center gap-6 bg-white px-6 py-10 text-neutral-900">
          {page > 1 && <Link href={mediaPageHref(page - 1, category)} rel="prev" className="underline underline-offset-4">前のページ</Link>}
          <span aria-current="page">{page} / {pageCount}</span>
          {page < pageCount && <Link href={mediaPageHref(page + 1, category)} rel="next" className="underline underline-offset-4">次のページ</Link>}
        </nav>
      )}

      <Footer />
    </main>
  )
}
