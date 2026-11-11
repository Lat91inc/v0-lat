import { formatArticleDate } from "@/lib/media-navigation"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { getArticleCards } from "@/lib/microcms/articles"

// カテゴリ表示用のマッピング
const categoryLabels: Record<string, string> = {
  caseStudy: "Case Study",
  insight: "Insight",
  column: "Column",
  news: "News",
}

// 日付フォーマット


export async function MediaSection() {
  const { contents: articles } = await getArticleCards(1, "all", 3)

  return (
    <section className="relative bg-neutral-50 py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-neutral-900" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
                Media
              </span>
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-neutral-900 tracking-tight">
              最新記事
            </h2>
          </div>
          <Link
            href="/media"
            className="inline-flex items-center gap-4 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors group"
          >
            <span className="tracking-wide">すべての記事を見る</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/media/${article.id}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
                  {/* Thumbnail or placeholder */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail.url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-6xl font-bold text-neutral-300/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-neutral-600">
                        {article.category?.[0]
                          ? categoryLabels[article.category[0]] || article.category[0]
                          : "Article"}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 text-white">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="font-mono text-xs text-neutral-400 mb-3 block">
                      {formatArticleDate(article.publishedAt || article.createdAt)}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 leading-relaxed group-hover:text-neutral-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">記事がまだありません</p>
          </div>
        )}
      </div>
    </section>
  )
}
