// プロダクト一覧と個別ページで共有する。本文は _content/<slug>.html
export type Product = {
  slug: string
  name: string
  catch: string
  summary: string
  description: string
  // 概要の下に出すタグ。ジャンル（領域）と機能の2段
  genres: string[]
  features: string[]
  // スマホだけで使うプロダクトは browserImage を持たず、phoneImage2 と2台で並べる
  browserImage?: string
  phoneImage: string
  phoneImage2?: string
}

export const products: Product[] = [
  {
    slug: "baramaki-ai",
    name: "Baramaki AI",
    catch: "一言メモから\n8つのSNSに同時配信",
    summary:
      "お店が書くのは一言メモだけ。AIがSNSごとの投稿文を書き分け、承認した投稿をX・Instagram・TikTokなど8つのSNSへ一斉に配信します。",
    description:
      "一言メモを書くだけで、AIがSNSごとの投稿文を書き分け、承認するとX・Instagram・TikTokなど8つのSNSへ一斉配信。実店舗のためのSNS投稿AI「Baramaki AI」。",
    genres: ["SNSマーケティング", "実店舗マーケティング"],
    features: ["SNS一斉配信", "AI投稿生成"],
    browserImage: "/products/img/baramaki-compose.jpg",
    phoneImage: "/products/img/baramaki-m-approve-ig.jpg",
  },
  {
    slug: "insta-lead-ai",
    name: "Insta Lead AI",
    catch: "近くの見込み客を\nリストでお届け",
    summary:
      "ハッシュタグか場所を指定するだけで、近くの見込み客やインフルエンサーをInstagramから集めてリストにします。プロフィールと見つけた投稿を添えて、画面とExcelで開けるファイルでお届けします。",
    description:
      "ハッシュタグか場所を指定するだけで、商圏の見込み客やインフルエンサーをInstagramから集めてリスト化。DM営業やギフティング先選びのためのリスト作成AI「Insta Lead AI」。",
    genres: ["Instagramマーケティング", "実店舗マーケティング"],
    features: ["見込み客リスト作成", "インフルエンサー探し", "ハッシュタグ・場所検索"],
    browserImage: "/products/img/il-job.jpg",
    phoneImage: "/products/img/il-m-job.jpg",
  },
  {
    slug: "talksite-ai",
    name: "Talksite AI",
    catch: "AIと会話するだけで\nホームページ制作",
    summary:
      "作りたいページについてAIと会話することで、AIが構成からWebサイトを作ります。できたサイトは、直したい部分を選んで文章で指示すると修正でき、ツール上からワンクリックで公開も可能です。",
    description:
      "Talksite AIは、ホームページやLPをAIで作るサービスです。作りたいページについてAIと会話するか、いまのサイトのURLを入力するとサイトを生成し、編集画面でAIに指示して修正できます。",
    genres: ["Web制作", "LP制作"],
    features: ["AIサイト生成", "企業ホームページ", "採用サイト", "サービスLP"],
    browserImage: "/products/img/talksite-editor.jpg",
    phoneImage: "/products/img/talksite-m-site.jpg",
  },
  {
    slug: "treal",
    name: "TREAL",
    catch: "オフライン購買を促進する\n消費者リサーチ",
    summary:
      "メーカーやブランドが、消費者に店頭で商品を買ってもらうキャンペーンを行うためのプラットフォームです。オフラインのPOSを動かしながら、消費者の生の声・UGC投稿の獲得に繋げます。",
    description:
      "TREALは、メーカーやブランドのためのオフライン購買促進プラットフォームです。消費者に店頭で対象の商品を買ってもらい、レシートで購入を確かめたうえで、アンケートの回答やSNSへの投稿を集めます。",
    genres: ["販促キャンペーン", "消費者リサーチ"],
    features: ["店頭購買促進", "購入者アンケート", "UGC獲得"],
    phoneImage: "/products/img/treal-m-fv.jpg",
    phoneImage2: "/products/img/treal-m-list.jpg",
  },
  {
    slug: "maneku-ai",
    name: "Maneku AI",
    catch: "店舗集客\n次の一手にもう迷わない",
    summary:
      "Googleマップの店舗情報や口コミ、近くの競合、地域の新しい情報を読み取り、いま手をつけるべき集客施策を優先度の高い順に並べます。口コミへの返信や投稿は、AIが下書きを作ります。",
    description:
      "Maneku AIは、実店舗の集客をまとめて管理する店舗向けのツールです。店舗情報や口コミ、近くの競合、地域の新着情報をもとに、次にやることを優先度の順に並べ、返信や投稿の下書きをAIが作ります。",
    genres: ["実店舗マーケティング", "Googleマップ対策", "MEO"],
    features: ["施策リコメンド", "口コミ返信", "競合リサーチ"],
    browserImage: "/products/img/maneku-dashboard.jpg",
    phoneImage: "/products/img/maneku-m-dashboard.jpg",
  },
]

// 個別ページの本文（_content/*.html）の <!--TAGS--> に差し込む。中身は上の定数だけ（外部入力は通らない）
export function tagsHtml(p: Product) {
  const row = (items: string[], cls: string) =>
    `<div class="ptags-row">${items.map((t) => `<span class="ptag ${cls}">${t}</span>`).join("")}</div>`
  return `<div class="ptags">${row(p.genres, "ptag--genre")}${row(p.features, "ptag--feature")}</div>`
}
