// プロダクト一覧と個別ページで共有する。本文は _content/<slug>.html
export type Product = {
  slug: string
  name: string
  catch: string
  summary: string
  description: string
  pills: string[]
  // スマホだけで使うプロダクトは browserImage を持たず、phoneImage2 と2台で並べる
  browserImage?: string
  phoneImage: string
  phoneImage2?: string
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
  {
    slug: "talksite-ai",
    name: "Talksite AI",
    catch: "答えるだけで、\nサイトができあがる。",
    summary:
      "会社の情報をいくつか答えるか、いまのサイトのURLを入れるだけ。AIがサイトを生成し、できあがったサイトは画面の上で話しかけるように直して、そのまま公開できます。",
    description:
      "会社情報に答えるか、現在のサイトのURLを入れるだけで、AIがホームページを生成。編集画面でAIに頼んで直し、そのまま公開できるAIサイト生成サービス「Talksite AI」。",
    pills: ["AIサイト生成", "リニューアル", "AI編集", "公開まで一貫"],
    browserImage: "/products/img/talksite-editor.jpg",
    phoneImage: "/products/img/talksite-m-site.jpg",
  },
  {
    slug: "treal",
    name: "TREAL",
    catch: "レシートで集まる、\n買った人の声。",
    summary:
      "商品を買った人が、レシートとアンケートを提出して報酬を受け取るレシートキャンペーンプラットフォーム。ブランドは、実際に購入した人の声とSNS投稿を集められます。",
    description:
      "商品を購入した人がレシートとアンケートを提出して報酬を受け取る、レシートキャンペーンプラットフォーム「TREAL」。調査・PR・ギフティングの3種類のキャンペーンを掲載できます。",
    pills: ["レシートキャンペーン", "購入者アンケート", "SNS投稿", "ギフティング"],
    phoneImage: "/products/img/treal-m-fv.jpg",
    phoneImage2: "/products/img/treal-m-list.jpg",
  },
]
