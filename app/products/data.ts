// プロダクト一覧と個別ページで共有する。本文は _content/<slug>.html
export type Product = {
  slug: string
  name: string
  catch: string
  summary: string
  description: string
  pills: string[]
  browserImage: string
  phoneImage: string
}

export const products: Product[] = [
  {
    slug: "baramaki-ai",
    name: "Baramaki AI",
    catch: "一言メモで、\n8つのSNSに配信。",
    summary:
      "お店が書くのは一言メモだけ。AIがSNSごとの投稿文を書き分け、承認した投稿をX・Instagram・TikTokなど8つのSNSへ一斉に配信します。",
    description:
      "一言メモを書くだけで、AIがSNSごとの投稿文を書き分け、承認するとX・Instagram・TikTokなど8つのSNSへ一斉配信。実店舗のためのSNS投稿AI「Baramaki AI」。",
    pills: ["実店舗のSNS運用", "AI文章生成", "一斉配信", "複数店舗管理"],
    browserImage: "/products/img/baramaki-compose.jpg",
    phoneImage: "/products/img/baramaki-m-approve-ig.jpg",
  },
  {
    slug: "insta-lead-ai",
    name: "Insta Lead AI",
    catch: "近くの見込み客、\nリストでお届け。",
    summary:
      "ハッシュタグか場所を指定するだけで、近くの見込み客をInstagramから集めてリストにします。プロフィールと見つけた投稿を添えて、画面とCSVでお届けします。",
    description:
      "ハッシュタグを指定するだけで、商圏の見込み客をInstagramから集めてリスト化。店舗集客のためのリスト作成AI「Insta Lead AI」。",
    pills: ["店舗集客", "Instagram", "リスト作成", "商圏マーケティング"],
    browserImage: "/products/img/il-job.jpg",
    phoneImage: "/products/img/il-m-job.jpg",
  },
]
