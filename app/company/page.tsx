import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"
import { MapPin } from "lucide-react"

const description =
  "株式会社Lat91の会社概要・企業情報。AIエージェント開発・DX推進パートナーとして、企業のAI活用、業務自動化、デジタルレイバー導入を支援します。"

export const metadata = createPageMetadata({
  title: "株式会社Lat91 会社概要・企業情報",
  description,
  path: "/company",
})

const companyInfo = [
  { label: "会社名", value: "株式会社Lat91（Lat91 Inc.）" },
  { label: "代表者名", value: "稲葉 幸太郎（Kotaro Inaba）" },
  { label: "設立", value: "2026年 5月25日" },
  { label: "法人番号", value: "1010401199099" },
  { label: "所在地", value: "東京都港区赤坂3-13-3 赤坂セントラルビル6F" },
]

const businessAreas = [
  "AIエージェント構築・運用事業",
  "DXソリューション事業",
  "AI社員（Digital Labor）派遣事業",
  "プロダクト開発事業",
]

export default function CompanyPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/company",
            name: "株式会社Lat91 会社概要・企業情報",
            description,
          }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "企業情報", path: "/company" },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-neutral-900" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
              Company
            </span>
          </span>
          <h1 className="text-[clamp(36px,6vw,64px)] font-bold text-neutral-900 leading-[1.1] tracking-tight">
            株式会社Lat91 企業情報
          </h1>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Company Details */}
            <div>
              <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 mb-10">
                Company Information
              </h2>

              <div className="bg-white rounded-2xl overflow-hidden">
                {companyInfo.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-6 px-8 ${
                      index !== companyInfo.length - 1
                        ? "border-b border-neutral-100"
                        : ""
                    }`}
                  >
                    <dt className="font-mono text-xs tracking-wider text-neutral-400 uppercase sm:w-28 flex-shrink-0">
                      {item.label}
                    </dt>
                    <dd className="text-base text-neutral-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Areas */}
            <div>
              <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 mb-10">
                Business Areas
              </h2>

              <div className="bg-white rounded-2xl overflow-hidden">
                {businessAreas.map((area, index) => (
                  <div
                    key={area}
                    className={`flex items-center gap-8 py-6 px-8 ${
                      index !== businessAreas.length - 1
                        ? "border-b border-neutral-100"
                        : ""
                    }`}
                  >
                    <span className="font-mono text-sm text-neutral-400 w-8 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base text-neutral-900">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 mb-10">
            Location
          </h2>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Map Embed */}
            <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[450px] bg-neutral-100 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.0534366773847!2d139.7344!3d35.6726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b8f8ec8a2c5%3A0x5b2b6d5e8e6d5e5e!2z6LWk5Z2C44K744Oz44OI44Op44Or44OT44Or!5e0!3m2!1sja!2sjp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lat91 Office Location"
              />
            </div>

            {/* Address Card */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center">
                  <MapPin size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    本社オフィス
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Head Office
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-base text-neutral-600">
                <div>
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-2">
                    Address
                  </p>
                  <p>
                    〒107-0052
                    <br />
                    東京都港区赤坂3-13-3
                    <br />
                    赤坂セントラルビル6F
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-2">
                    Access
                  </p>
                  <p className="text-sm leading-relaxed">
                    東京メトロ 銀座線・丸ノ内線
                    <br />
                    「赤坂見附駅」徒歩3分
                    <br />
                    <br />
                    東京メトロ 千代田線
                    <br />
                    「赤坂駅」徒歩5分
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
