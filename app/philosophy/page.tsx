import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

const description =
  "株式会社Lat91のフィロソフィ。AIエージェント時代に、人間の意志と創造が輝く世界をつくるための思想、代表メッセージ、社名に込めた想いをご紹介します。"

// 文節の途中で折り返さないよう、代表メッセージを意味のまとまりごとに持つ
const messageParagraphs = [
  ["\u4eba\u985e\u306b\u3068\u3063\u3066\u3001", "\u304b\u3064\u3066\u306a\u3044\u6642\u4ee3\u304c\u3084\u3063\u3066\u304d\u307e\u3057\u305f\u3002", "\u8ab0\u3082\u304c\u5275\u308c\u308b\u3002", "\u5c4a\u3051\u3089\u308c\u308b\u3002", "\u5c4a\u304b\u306a\u304b\u3063\u305f\u77e5\u8b58\u306b\u624b\u304c\u5c4a\u304f\u3002"],
  ["\u305d\u3057\u3066\u3001", "\u5f93\u6765\u306e\u30c1\u30e3\u30c3\u30c8\u30dc\u30c3\u30c8\u3067\u306f\u306a\u304f\u3001", "\u4e00\u5ea6\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u3059\u308c\u3070\u3001", "24\u6642\u9593\u81ea\u5f8b\u7684\u306b\u696d\u52d9\u3068\u6539\u5584\u3092", "\u7e70\u308a\u8fd4\u3059AI\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u304c", "\u8a95\u751f\u3057\u307e\u3057\u305f\u3002"],
  ["\u3053\u308c\u304b\u3089\u7bc9\u304f\u3079\u304d\u672a\u6765\u306f\u3001", "AI\u30d5\u30a1\u30fc\u30b9\u30c8\u306e\u6642\u4ee3\u3067\u306f\u306a\u304f\u3001", "\u30d2\u30e5\u30fc\u30de\u30f3\u30d5\u30a1\u30fc\u30b9\u30c8\u306e\u6642\u4ee3\u3060\u3068\u3001", "\u50d5\u305f\u3061\u306f\u4fe1\u3058\u3066\u3044\u307e\u3059\u3002"],
  ["\u751f\u7523\u306e\u305f\u3081\u306b", "\u81ea\u5206\u3089\u3057\u3055\u3092\u6d88\u8017\u3055\u305b\u308b", "\u5fc5\u8981\u304c\u306a\u304f\u306a\u308a\u3001", "\u4f55\u304b\u3092\u751f\u307f\u51fa\u3059\u3053\u3068\u3001", "\u81ea\u5206\u3089\u3057\u304f\u3044\u308b\u3053\u3068\u304c\u3001", "\u4e21\u7acb\u3059\u308b\u3002"],
  ["AI\u304c\u5b9f\u52d9\u306e99%\u3092\u62c5\u3063\u3066\u3044\u304f\u6642\u4ee3\u3002", "\u4eba\u9593\u306f\u3001", "\u6700\u3082\u5c0a\u30441%\u306e", "\u610f\u5fd7\u3068\u5275\u9020\u3060\u3051\u306b\u5411\u304d\u5408\u3048\u308b\u3002", "\u4f55\u3092\u7f8e\u3057\u3044\u3068\u611f\u3058\u3001", "\u4f55\u306b\u6012\u308a\u3001", "\u4f55\u3092\u9078\u3076\u304b\u3002"],
  ["\u3082\u3057\u4eca\u306e\u4ed5\u4e8b\u306e\u307b\u3068\u3093\u3069\u304c", "\u306a\u304f\u306a\u3063\u305f\u3068\u3057\u3066\u3001", "\u50d5\u305f\u3061\u306f\u4f55\u306b\u96c6\u4e2d\u3059\u308b\u3060\u308d\u3046\u3002", "\u8ab0\u306e\u4ee3\u308f\u308a\u3067\u3082\u306a\u3044\u3001", "\u81ea\u5206\u306b\u3057\u304b\u751f\u307f\u51fa\u305b\u306a\u3044", "\u4fa1\u5024\u306f\u306a\u3093\u3060\u308d\u3046\u304b\u3002"],
  ["\u50d5\u305f\u3061\u306f\u305d\u306e\u77ac\u9593\u3092\u5275\u308a\u3001", "\u7d14\u5ea6\u306e\u9ad8\u3044\u5275\u9020\u3067", "\u6ea2\u308c\u308b\u4e16\u754c\u3092\u76ee\u6307\u3057\u3066\u307e\u3059\u3002"],
]

export const metadata: Metadata = createPageMetadata({
  title: "フィロソフィー・代表メッセージ",
  description,
  path: "/philosophy",
})

export default function PhilosophyPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/philosophy",
            name: "フィロソフィー・代表メッセージ",
            description,
          }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "フィロソフィー", path: "/philosophy" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-9">
          <div className="w-12 h-px bg-neutral-900" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">Philosophy</span>
        </div>
        <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.25] tracking-[-0.03em] text-neutral-900 [word-break:auto-phrase] [text-wrap:balance]">
          {"AI\u6642\u4EE3\u306B\u4EBA\u9593\u306E\u610F\u5FD7\u3068\u5275\u9020\u304C\u8F1D\u304F\u4E16\u754C\u3092\u5275\u308B"}
        </h1>
        <p className="text-[15px] text-neutral-500 leading-[2] mt-8">
          {"\u30C6\u30AF\u30CE\u30ED\u30B8\u30FC\u304C\u4EBA\u306E\u53EF\u80FD\u6027\u3092\u62E1\u5F35\u3059\u308B\u6642\u4EE3\u3002\u79C1\u305F\u3061\u306F\u3001AI\u306B\u4EFB\u305B\u3089\u308C\u308B\u3053\u3068\u3092\u6B63\u3057\u304F\u4EFB\u305B\u3001"}<br />
          {"\u4EBA\u9593\u304C\u6301\u3063\u3066\u3044\u308B\u300C\u610F\u5FD7\u300D\u3068\u300C\u5275\u9020\u300D\u306B\u96C6\u4E2D\u3067\u304D\u308B\u4E16\u754C\u3092\u76EE\u6307\u3057\u3066\u3044\u307E\u3059\u3002"}
        </p>
      </section>

      {/* CEO Message */}
      <section className="border-t border-neutral-200 px-6 lg:px-20 py-20 lg:py-24">
        <div className="max-w-[780px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px bg-neutral-300" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">Message</span>
            <span className="w-10 h-px bg-neutral-300" />
          </div>
          <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] leading-[1.4] text-neutral-900 text-center">
            {"\u4EE3\u8868\u30E1\u30C3\u30BB\u30FC\u30B8"}
          </h2>

          <div
            aria-hidden="true"
            className="text-center text-[64px] lg:text-[96px] leading-[0.7] text-neutral-200 select-none mt-11 mb-6"
            style={{ fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif JP", serif' }}
          >
            {"\u201C"}
          </div>

          <p className="text-[clamp(22px,3vw,32px)] font-bold leading-[1.7] tracking-[-0.02em] text-neutral-900 text-center">
            {"AI\u306B\u4EFB\u305B\u3066\u4EBA\u306E\u7D14\u5EA6\u306B\u5411\u304D\u5408\u3046"}<br />
            {"\u30D2\u30E5\u30FC\u30DE\u30F3\u30D5\u30A1\u30FC\u30B9\u30C8\u306E\u6642\u4EE3\u3078"}
          </p>

          <div className="mt-14 space-y-6 text-[15px] text-neutral-600 leading-[2]">
            {messageParagraphs.map((phrases) => (
              <p key={phrases[0]}>
                {phrases.map((phrase) => (
                  <span key={phrase} className="inline-block">{phrase}</span>
                ))}
              </p>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-neutral-200 flex items-end justify-between gap-6">
            <div className="font-mono text-[10px] tracking-[0.15em] text-neutral-400 uppercase leading-[1.8]">
              {"\u682A\u5F0F\u4F1A\u793ELat91"}<br />CEO &amp; Founder
            </div>
            <div
              className="text-[22px] lg:text-[26px] tracking-[0.12em] leading-[1.2] text-neutral-900"
              style={{ fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif JP", serif' }}
            >
              {"\u7A32\u8449 \u5E78\u592A\u90CE"}
            </div>
          </div>
        </div>
      </section>

      {/* Origin of Name */}
      <section className="border-t border-neutral-200 px-6 lg:px-20 py-24 lg:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-7">
            <span className="w-10 h-px bg-neutral-300" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">Origin of Name</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold tracking-[-0.02em] leading-[1.3] mb-8 text-neutral-900">
                {"\u793E\u540D\u306B\u8FBC\u3081\u305F\u601D\u3044"}
              </h2>
              <div className="text-[15px] text-neutral-600 leading-[2.2] space-y-5">
                <p><strong className="text-neutral-900 font-bold">Lat91</strong>{"\u3068\u3044\u3046\u793E\u540D\u306F\u3001\u5730\u7403\u306E\u7DEF\u5EA6\u304C90\u5EA6\u3067\u7D42\u308F\u308B\u3053\u3068\u306B\u7531\u6765\u3057\u3066\u3044\u307E\u3059\u300291\u5EA6\u76EE\u306F\u3001\u5730\u56F3\u4E0A\u306B\u5B58\u5728\u3057\u306A\u3044\u3002\u307E\u3060\u8AB0\u3082\u898B\u305F\u3053\u3068\u306E\u306A\u3044\u666F\u8272\u3002"}</p>
                <p>{"90\u5EA6\u307E\u3067\u3092AI\u306B\u6B63\u3057\u304F\u62C5\u308F\u305B\u3001\u307F\u3093\u306A\u306791\u5EA6\u76EE\u306B\u7ACB\u3064\u3002\u79C1\u306F\u3001\u305D\u306E\u666F\u8272\u3092\u898B\u305F\u3044\u3057\u5275\u3063\u3066\u307F\u305F\u3044\u3001\u3060\u304B\u3089\u3053\u306E\u4F1A\u793E\u3092\u8A2D\u7ACB\u3057\u307E\u3057\u305F\u3002"}</p>
              </div>
            </div>
            <div className="flex items-start justify-center -mt-20">
              <svg width="384" height="456" viewBox="0 0 680 520">
                <defs><clipPath id="globe-clip"><circle cx="340" cy="240" r="180"/></clipPath></defs>
                <circle cx="340" cy="240" r="184" fill="none" stroke="#73726c" strokeWidth="0.3" opacity="0.15"/>
                <circle cx="340" cy="240" r="180" fill="#f5f4ed" stroke="#73726c" strokeWidth="1" opacity="0.9"/>
                <g clipPath="url(#globe-clip)" fill="none" stroke="#73726c" strokeWidth="0.4" opacity="0.2">
                  <ellipse cx="340" cy="240" rx="180" ry="180"/>
                  <ellipse cx="340" cy="240" rx="180" ry="173.9"/>
                  <ellipse cx="340" cy="193" rx="180" ry="50"/>
                  <ellipse cx="340" cy="287" rx="180" ry="50"/>
                  <ellipse cx="340" cy="167" rx="150" ry="36"/>
                  <ellipse cx="340" cy="313" rx="150" ry="36"/>
                  <ellipse cx="340" cy="144" rx="108" ry="22"/>
                  <ellipse cx="340" cy="336" rx="108" ry="22"/>
                  <ellipse cx="340" cy="108" rx="56" ry="10"/>
                  <ellipse cx="340" cy="372" rx="56" ry="10"/>
                </g>
                <g clipPath="url(#globe-clip)" fill="none" stroke="#73726c" strokeWidth="0.4" opacity="0.15">
                  <ellipse cx="340" cy="240" rx="45" ry="180"/>
                  <ellipse cx="340" cy="240" rx="90" ry="180"/>
                  <ellipse cx="340" cy="240" rx="135" ry="180"/>
                  <line x1="340" y1="60" x2="340" y2="420"/>
                </g>
                <ellipse cx="340" cy="84" rx="28" ry="5" fill="none" stroke="#73726c" strokeWidth="1.5" opacity="0.6"/>
                <circle cx="340" cy="60" r="3.5" fill="#73726c" opacity="0.7"/>
                <text x="370" y="68" fill="#3d3d3a" fontFamily="sans-serif" fontSize="14" fontWeight="500" opacity="0.6">{"90\u00B0N"}</text>
                <g opacity="0.9">
                  <path d="M 295 38 Q 318 20, 340 18 Q 362 20, 385 38" fill="none" stroke="#73726c" strokeWidth="1.8" strokeDasharray="4 3"/>
                  <circle cx="340" cy="16" r="5" fill="none" stroke="#73726c" strokeWidth="1.5"/>
                  <circle cx="340" cy="16" r="1.5" fill="#73726c"/>
                </g>
                <text x="398" y="22" fill="#141413" fontFamily="sans-serif" fontSize="16" fontWeight="600" opacity="0.9">{"91\u00B0"}</text>
                <line x1="340" y1="56" x2="340" y2="24" stroke="#73726c" strokeWidth="0.8" opacity="0.35" strokeDasharray="2 2"/>
                <text x="340" y="470" textAnchor="middle" fill="#3d3d3a" fontFamily="sans-serif" fontSize="12" opacity="0.4">The 91st degree does not exist on any map.</text>
                <text x="340" y="488" textAnchor="middle" fill="#3d3d3a" fontFamily="sans-serif" fontSize="12" opacity="0.4">That is exactly why we go there.</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-neutral-200 py-28 lg:py-32 px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-8 h-px bg-neutral-300" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">Mission</span>
          <span className="w-8 h-px bg-neutral-300" />
        </div>
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.5] tracking-[-0.02em] max-w-[600px] mx-auto text-neutral-900">
          {"\u4EBA\u9593\u306E\u610F\u5FD7\u3068\u5275\u9020\u304C"}<br />
          {"\u8F1D\u304F\u4E16\u754C\u3092\u5275\u308B"}
        </h2>
      </section>

      {/* Values */}
      <section className="bg-neutral-800 text-white py-28 lg:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-8 h-px bg-neutral-600" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">Value</span>
            <span className="w-8 h-px bg-neutral-600" />
          </div>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-center tracking-[-0.02em] mb-16">{"\u79C1\u305F\u3061\u306E\u4FA1\u5024\u89B3"}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-neutral-900 rounded-2xl p-9 relative overflow-hidden min-h-[220px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xl font-bold tracking-[-0.01em] relative z-10">Be True</span>
                <span className="text-[72px] font-bold text-neutral-100 leading-none tracking-[-0.04em] absolute top-5 right-6">01</span>
              </div>
              <div className="text-xs text-neutral-500 mb-6">{"\u7D14\u5EA6\u3092\u5927\u5207\u306B\u3002"}</div>
              <p className="text-sm text-neutral-600 leading-[1.9]">{"\u7D14\u7C8B\u306A\u610F\u5FD7\u3067\u30B3\u30C8\u306B\u5411\u304D\u5408\u3044\u3001\u81EA\u3089\u306E\u5185\u306A\u308B\u58F0\u306B\u771F\u3063\u76F4\u3050\u306B\u5F93\u3046\u3053\u3068\u3002"}</p>
            </div>
            <div className="bg-white text-neutral-900 rounded-2xl p-9 relative overflow-hidden min-h-[220px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xl font-bold tracking-[-0.01em] relative z-10">Stay Kind</span>
                <span className="text-[72px] font-bold text-neutral-100 leading-none tracking-[-0.04em] absolute top-5 right-6">02</span>
              </div>
              <div className="text-xs text-neutral-500 mb-6">{"\u512A\u304F\u3042\u308B\u3053\u3068\u3002"}</div>
              <p className="text-sm text-neutral-600 leading-[1.9]">{"相手を深く尊重し、共に歩むこと。巧詐は拙誠に如かず。"}</p>
            </div>
            <div className="bg-white text-neutral-900 rounded-2xl p-9 relative overflow-hidden min-h-[220px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xl font-bold tracking-[-0.01em] relative z-10">{"Build, Don't Decorate"}</span>
                <span className="text-[72px] font-bold text-neutral-100 leading-none tracking-[-0.04em] absolute top-5 right-6">03</span>
              </div>
              <div className="text-xs text-neutral-500 mb-6">{"\u4E2D\u8EAB\u3092\u5927\u5207\u306B\u3002"}</div>
              <p className="text-sm text-neutral-600 leading-[1.9]">{"\u672C\u5F53\u306B\u4FA1\u5024\u306E\u3042\u308B\u672C\u8CEA\u3092\u6CE5\u81ED\u304F\u7A4D\u307F\u4E0A\u3052\u308B\u3053\u3068\u3002\u898B\u305B\u304B\u3051\u306E\u5B8C\u6210\u5EA6\u3088\u308A\u3001\u5B9F\u3092\u4F34\u3046\u529B\u5F37\u3055\u3092\u3002"}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
