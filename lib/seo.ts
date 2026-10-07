import type { Metadata } from "next"

export const SITE_URL = "https://www.lat91.co.jp"
export const SITE_BRAND = "Lat91"
export const COMPANY_NAME = "株式会社Lat91"
export const DEFAULT_OG_IMAGE_PATH = "/images/og-image.jpg"
export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`
export const DEFAULT_DESCRIPTION =
  "株式会社Lat91は、AIエージェント導入とDX推進を通じて企業の成長を実現するAI・DXパートナーです。戦略立案から開発・運用まで一気通貫でサポートします。"

export const SEO_KEYWORDS = [
  "株式会社Lat91",
  "株式会社lat91",
  "Lat91",
  "lat91.co.jp",
  "AIエージェント",
  "AIエージェント導入",
  "AIエージェント開発",
  "生成AI",
  "DX推進",
  "AI導入",
  "デジタルレイバー",
  "業務自動化",
  "AI社員",
]

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${COMPANY_NAME} - AIエージェント・DX推進パートナー`,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | ${SITE_BRAND}`,
      description,
      url,
      siteName: COMPANY_NAME,
      type: "website",
      locale: "ja_JP",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_BRAND}`,
      description,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: ["Lat91 Inc.", SITE_BRAND, "株式会社lat91", "株式会社Lat.91"],
    legalName: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: DEFAULT_OG_IMAGE,
    foundingDate: "2026-05-25",
    taxID: "1010401199099",
    founder: {
      "@type": "Person",
      name: "稲葉 幸太郎",
      alternateName: "Kotaro Inaba",
      jobTitle: "代表取締役（CEO）",
    },
    address: {
      "@type": "PostalAddress",
      postalCode: "107-0052",
      addressRegion: "東京都",
      addressLocality: "港区",
      streetAddress: "赤坂3-13-3 赤坂セントラルビル6F",
      addressCountry: "JP",
    },
    areaServed: "JP",
    description: DEFAULT_DESCRIPTION,
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: COMPANY_NAME,
    alternateName: SITE_BRAND,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "ja",
  }
}

export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}) {
  const url = absoluteUrl(path)

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "ja",
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/service#service`,
    name: "AIエージェント導入・DXソリューション",
    serviceType: "AIエージェント開発・DX推進支援",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "日本",
    },
    url: `${SITE_URL}/service`,
    description:
      "株式会社Lat91は、セールス、マーケティング、カスタマーサポート、バックオフィスの業務に合わせたAIエージェント導入とDX推進を支援します。",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lat91サービス",
      itemListElement: [
        "DXソリューション",
        "AIエージェント構築・運用",
        "AI社員派遣",
        "プロダクト開発",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  }
}

export function articleJsonLd({
  path,
  headline,
  description,
  image,
  publishedAt,
  updatedAt,
}: {
  path: string
  headline: string
  description: string
  image?: string
  publishedAt: string
  updatedAt: string
}) {
  const url = absoluteUrl(path)

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    image: [image || DEFAULT_OG_IMAGE],
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
    },
    inLanguage: "ja",
  }
}
