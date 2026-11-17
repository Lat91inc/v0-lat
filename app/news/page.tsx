import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { NewsRows } from "@/components/sections/news-section"
import { NEWS_PAGE_SIZE, getNewsList } from "@/lib/microcms/news"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

export const revalidate = 60

const description = "株式会社Lat91からのお知らせ。サービス・プロダクトの提供開始、登壇・掲載、会社に関する情報をお届けします。"

type NewsSearchParams = Promise<{ page?: string | string[] }>

function parsePage(value: string | string[] | undefined) {
  if (value === undefined) return 1
  const page = Number(value)
  if (Array.isArray(value) || !Number.isSafeInteger(page) || page < 1) return null
  return page
}

function newsPageHref(page: number) {
  return page > 1 ? `/news?page=${page}` : "/news"
}

export async function generateMetadata({ searchParams }: { searchParams: NewsSearchParams }) {
  const page = parsePage((await searchParams).page)
  if (!page) notFound()
  const { totalCount } = await getNewsList(page)
  return createPageMetadata({
    title: `お知らせ${page > 1 ? `（${page}ページ目）` : ""}`,
    description,
    path: newsPageHref(page),
    // 0件のあいだは検索に出さない
    noIndex: totalCount === 0,
  })
}

export default async function NewsPage({ searchParams }: { searchParams: NewsSearchParams }) {
  const page = parsePage((await searchParams).page)
  if (!page) notFound()
  const data = await getNewsList(page)
  const pageCount = Math.max(1, Math.ceil(data.totalCount / NEWS_PAGE_SIZE))
  if (page > pageCount) notFound()

  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({ path: newsPageHref(page), name: "お知らせ", description }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "お知らせ", path: "/news" },
          ]),
        ]}
      />

      <section className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-neutral-900" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
              News
            </span>
          </span>
          <h1 className="text-[clamp(36px,6vw,64px)] font-bold text-neutral-900 leading-[1.1] tracking-tight">
            お知らせ
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          {data.contents.length > 0 ? (
            <NewsRows items={data.contents} />
          ) : (
            <p className="py-16 text-center text-neutral-500">お知らせはまだありません</p>
          )}
        </div>
      </section>

      {pageCount > 1 && (
        <nav aria-label="お知らせ一覧のページ送り" className="flex items-center justify-center gap-6 bg-white px-6 pb-16 text-neutral-900">
          {page > 1 && <Link href={newsPageHref(page - 1)} rel="prev" className="underline underline-offset-4">前のページ</Link>}
          <span aria-current="page">{page} / {pageCount}</span>
          {page < pageCount && <Link href={newsPageHref(page + 1)} rel="next" className="underline underline-offset-4">次のページ</Link>}
        </nav>
      )}

      <Footer />
    </main>
  )
}
