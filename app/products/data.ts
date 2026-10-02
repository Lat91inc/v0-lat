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
    catch: "ホームページの作成と修正を\nAIに頼めます",
    summary:
      "会社についての質問に答えると、AIが構成・文章・デザインの入ったサイトを作ります。できたサイトは、直したい部分を選んで文章で指示すると修正できます。",
    description:
      "Talksite AIは、会社のホームページをAIで作るサービスです。質問に答えるか、いまのサイトのURLを入力するとサイトを生成し、編集画面でAIに指示して修正できます。",
    pills: ["AIサイト生成", "リニューアル", "AI編集", "共有と公開"],
    browserImage: "/products/img/talksite-editor.jpg",
    phoneImage: "/products/img/talksite-m-site.jpg",
  },
  {
    slug: "treal",
    name: "TREAL",
    catch: "商品を買った人の声を集める\nレシートキャンペーン",
    summary:
      "メーカーやブランドが、自社の商品を買った人に向けてキャンペーンを行うためのプラットフォームです。参加者はレシートとアンケートを送り、審査のあとに報酬を受け取ります。",
    description:
      "TREALは、商品を買った人がレシートとアンケートを送って報酬を受け取る、レシートキャンペーンのプラットフォームです。調査・PR・ギフティングの3種類のキャンペーンを開けます。",
    pills: ["レシートキャンペーン", "購入者アンケート", "SNS投稿"],
    phoneImage: "/products/img/treal-m-fv.jpg",
    phoneImage2: "/products/img/treal-m-list.jpg",
  },
  {
    slug: "maneku-ai",
    name: "Maneku AI",
    catch: "次にやる集客を\nAIが順番に並べます",
    summary:
      "Googleマップの店舗情報や口コミ、近くの競合、地域の新しい情報を読み取り、いま手をつけるべき集客を優先度の高い順に並べます。口コミへの返信や投稿は、AIが下書きを作ります。",
    description:
      "Maneku AIは、実店舗の集客をまとめて管理する店舗向けのツールです。店舗情報や口コミ、近くの競合、地域の新着情報をもとに、次にやることを優先度の順に並べ、返信や投稿の下書きをAIが作ります。",
    pills: ["店舗集客", "Googleマップ対策", "口コミ返信", "地域リサーチ"],
    browserImage: "/products/img/maneku-recommend.jpg",
    phoneImage: "/products/img/maneku-m-recommend.jpg",
  },
]
