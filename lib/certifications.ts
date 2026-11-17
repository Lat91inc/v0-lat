// 企業情報ページの「認証・取り組み」（見出しは Initiatives）に並べるロゴ。自己宣言を「認証」と書かない。増えたら配列に1件足し、画像を public/certifications/ に置く。
// ロゴは各制度の使用規程どおり、色・縦横比・形を変えずに使う。
export type Certification = {
  id: string
  name: string // カードの見出し
  description: string
  logo: { src: string; alt: string; width: number; height: number } // alt はロゴに書いてある文字どおり
  date?: string // 例：2026年11月
  href?: string // 詳しいお知らせや制度のページ
}

export const certifications: Certification[] = [
  {
    id: "security-action",
    name: "SECURITY ACTION 二つ星",
    description: "情報処理推進機構（IPA）の制度に基づき、情報セキュリティ対策への取り組みを自己宣言しています。",
    logo: { src: "/certifications/security-action-futatsuboshi.png", alt: "SECURITY ACTION 二つ星 セキュリティ対策自己宣言", width: 480, height: 480 },
    date: "2026年11月 宣言",
  },
]
