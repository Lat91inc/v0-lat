import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatArticleDate } from "@/lib/media-navigation"
import { getNewsList, type NewsListItem } from "@/lib/microcms/news"

async function getLatestNews(): Promise<NewsListItem[]> {
  // トップページは止めない：取れないときはセクションごと出さない
  try {
    return (await getNewsList(1, 3)).contents
  } catch {
    return []
  }
}

export async function NewsSection() {
  const news = await getLatestNews()
  if (news.length === 0) return null

  return (
    <section className="relative bg-white px-6 md:px-12">
      {/* 直前の CTA も白背景なので、線で区切る */}
      <div className="max-w-6xl mx-auto border-t border-neutral-200 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-neutral-900" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
                News
              </span>
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-neutral-900 tracking-tight">
              お知らせ
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-4 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors group"
          >
            <span className="tracking-wide">すべてのお知らせを見る</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>

        <NewsRows items={news} />
      </div>
    </section>
  )
}

export function NewsRows({ items }: { items: NewsListItem[] }) {
  return (
    <ul className="border-t border-neutral-200">
      {items.map((item) => (
        <li key={item.id} className="border-b border-neutral-200">
          <Link
            href={`/news/${item.id}`}
            className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-10 py-6 md:py-7"
          >
            <time
              dateTime={item.publishedAt}
              className="shrink-0 font-mono text-sm text-neutral-400 md:w-28"
            >
              {formatArticleDate(item.publishedAt)}
            </time>
            <span className="flex-1 text-base font-medium text-neutral-900 leading-relaxed group-hover:text-neutral-500 transition-colors">
              {item.title}
            </span>
            <ArrowRight
              size={16}
              className="hidden md:block shrink-0 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
