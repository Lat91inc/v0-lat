import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"
import { products } from "./data"
import "./products.css"

const description =
  "株式会社Lat91が開発・提供するプロダクトの一覧。店舗のSNS配信を自動化するBaramaki AI、Instagramから商圏の見込み客リストを作るInsta Lead AI、AIでサイトを生成するTalksite AI、レシートキャンペーンプラットフォームのTREAL、店舗の集客でやることを優先度の順に並べるManeku AI。"

export const metadata = createPageMetadata({ title: "プロダクト", description, path: "/products" })

export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({ path: "/products", name: "プロダクト", description }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "プロダクト", path: "/products" },
          ]),
        ]}
      />

      <section className="pt-36 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-neutral-900" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400">Products</span>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-bold text-neutral-900 leading-[1.2] tracking-[-0.03em] mb-7">
            プロダクト
          </h1>
          <p className="text-[15px] text-neutral-500 leading-[2] max-w-[520px] [word-break:auto-phrase]">
            集客・発信・販促を支えるプロダクト。
            <br />
            どれも、現場の担当者が毎日使う画面から設計しています。
          </p>
        </div>
      </section>

      {products.map((p, i) => (
        <section key={p.slug} className={`overflow-hidden border-t border-neutral-200 ${i % 2 ? "bg-neutral-50" : "bg-white"}`}>
          <Link
            href={`/products/${p.slug}`}
            className="group grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24"
          >
            <div className="[word-break:auto-phrase]">
              <div className="font-mono text-[11px] tracking-[0.15em] text-neutral-400 mb-5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-mono text-[11px] tracking-[0.18em] text-neutral-400 uppercase mb-3">{p.name}</div>
              <h2 className="text-[clamp(26px,3.2vw,36px)] font-bold text-neutral-900 tracking-[-0.02em] leading-[1.35] whitespace-pre-line [text-wrap:balance]">
                {p.catch}
              </h2>
              <p className="text-[14px] text-neutral-500 leading-[2] mt-6 max-w-[460px] [text-wrap:pretty]">{p.summary}</p>
              <div className="ptags">
                {(
                  [
                    [p.genres, "ptag--genre"],
                    [p.features, "ptag--feature"],
                  ] as const
                ).map(([items, cls]) => (
                  <div key={cls} className="ptags-row">
                    {items.map((t) => (
                      <span key={t} className={`ptag ${cls}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 mt-9 text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-1">
                {p.name}の詳細を見る
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="pp">
              {p.browserImage ? (
                <div className="hero-visual">
                  <div className="hv-browser">
                    <div className="bar">
                      <i />
                      <i />
                      <i />
                    </div>
                    <img src={p.browserImage} width={1600} height={1000} alt={`${p.name}の画面`} loading={i ? "lazy" : "eager"} />
                  </div>
                  <div className="hv-phone">
                    <img src={p.phoneImage} width={780} height={1688} alt={`スマホで見た${p.name}の画面`} loading="lazy" />
                  </div>
                </div>
              ) : (
                <div className="hero-visual hv-phones">
                  <div className="hv-ph">
                    <img src={p.phoneImage} width={780} height={1688} alt={`${p.name}の画面`} loading="lazy" />
                  </div>
                  {p.phoneImage2 && (
                    <div className="hv-ph">
                      <img src={p.phoneImage2} width={780} height={1688} alt={`${p.name}の画面（2枚目）`} loading="lazy" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        </section>
      ))}

      <Footer />
    </main>
  )
}
