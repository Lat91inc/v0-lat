import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"

const description =
  "株式会社Lat91のフィロソフィ。AIエージェント時代に、人間の意志と創造が輝く世界をつくるための思想、代表メッセージ、社名に込めた想いをご紹介します。"

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
            <p>{"\u4EBA\u985E\u306B\u3068\u3063\u3066\u3001\u304B\u3064\u3066\u306A\u3044\u6642\u4EE3\u304C\u3084\u3063\u3066\u304D\u307E\u3057\u305F\u3002\u8AB0\u3082\u304C\u5275\u308C\u308B\u3002\u5C4A\u3051\u3089\u308C\u308B\u3002\u5C4A\u304B\u306A\u304B\u3063\u305F\u77E5\u8B58\u306B\u624B\u304C\u5C4A\u304F\u3002"}</p>
            <p>{"\u305D\u3057\u3066\u3001\u5F93\u6765\u306E\u30C1\u30E3\u30C3\u30C8\u30DC\u30C3\u30C8\u3067\u306F\u306A\u304F\u3001\u4E00\u5EA6\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u3059\u308C\u3070\u300124\u6642\u9593\u81EA\u5F8B\u7684\u306B\u696D\u52D9\u3068\u6539\u5584\u3092\u7E70\u308A\u8FD4\u3059AI\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u304C\u8A95\u751F\u3057\u307E\u3057\u305F\u3002"}</p>
            <p>{"\u3053\u308C\u304B\u3089\u7BC9\u304F\u3079\u304D\u672A\u6765\u306F\u3001AI\u30D5\u30A1\u30FC\u30B9\u30C8\u306E\u6642\u4EE3\u3067\u306F\u306A\u304F\u3001\u30D2\u30E5\u30FC\u30DE\u30F3\u30D5\u30A1\u30FC\u30B9\u30C8\u306E\u6642\u4EE3\u3060\u3068\u3001\u50D5\u305F\u3061\u306F\u4FE1\u3058\u3066\u3044\u307E\u3059\u3002"}</p>
            <p>{"\u751F\u7523\u306E\u305F\u3081\u306B\u81EA\u5206\u3089\u3057\u3055\u3092\u6D88\u8017\u3055\u305B\u308B\u5FC5\u8981\u304C\u306A\u304F\u306A\u308A\u3001\u4F55\u304B\u3092\u751F\u307F\u51FA\u3059\u3053\u3068\u3001\u81EA\u5206\u3089\u3057\u304F\u3044\u308B\u3053\u3068\u304C\u3001\u4E21\u7ACB\u3059\u308B\u3002"}</p>
            <p>{"AI\u304C\u5B9F\u52D9\u306E99%\u3092\u62C5\u3063\u3066\u3044\u304F\u6642\u4EE3\u3002\u4EBA\u9593\u306F\u3001\u6700\u3082\u5C0A\u30441%\u306E\u610F\u5FD7\u3068\u5275\u9020\u3060\u3051\u306B\u5411\u304D\u5408\u3048\u308B\u3002\u4F55\u3092\u7F8E\u3057\u3044\u3068\u611F\u3058\u3001\u4F55\u306B\u6012\u308A\u3001\u4F55\u3092\u9078\u3076\u304B\u3002"}</p>
            <p>{"\u3082\u3057\u4ECA\u306E\u4ED5\u4E8B\u306E\u307B\u3068\u3093\u3069\u304C\u306A\u304F\u306A\u3063\u305F\u3068\u3057\u3066\u3001\u50D5\u305F\u3061\u306F\u4F55\u306B\u96C6\u4E2D\u3059\u308B\u3060\u308D\u3046\u3002\u8AB0\u306E\u4EE3\u308F\u308A\u3067\u3082\u306A\u3044\u3001\u81EA\u5206\u306B\u3057\u304B\u751F\u307F\u51FA\u305B\u306A\u3044\u4FA1\u5024\u306F\u306A\u3093\u3060\u308D\u3046\u304B\u3002"}</p>
            <p>{"\u50D5\u305F\u3061\u306F\u305D\u306E\u77AC\u9593\u3092\u5275\u308A\u3001\u7D14\u5EA6\u306E\u9AD8\u3044\u5275\u9020\u3067\u6EA2\u308C\u308B\u4E16\u754C\u3092\u76EE\u6307\u3057\u3066\u307E\u3059\u3002"}</p>
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
