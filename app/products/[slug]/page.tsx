import { readFileSync } from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo"
import { products } from "../data"
import "../products.css"

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = products.find((x) => x.slug === slug)
  if (!p) return {}
  return createPageMetadata({ title: p.name, description: p.description, path: `/products/${p.slug}` })
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const p = products.find((x) => x.slug === slug)
  if (!p) notFound()
  // 自社で書いた静的な本文（ユーザー入力は通らない）。ビルド時に読み込んで静的に出す
  const html = readFileSync(path.join(process.cwd(), "app/products/_content", `${p.slug}.html`), "utf8")

  return (
    <div className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({ path: `/products/${p.slug}`, name: p.name, description: p.description }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "プロダクト", path: "/products" },
            { name: p.name, path: `/products/${p.slug}` },
          ]),
        ]}
      />
      <main className="pp" dangerouslySetInnerHTML={{ __html: html }} />
      <Footer />
    </div>
  )
}
