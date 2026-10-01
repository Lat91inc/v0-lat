import type { MetadataRoute } from "next"
import { client, type Article } from "@/lib/microcms/client"

const BASE_URL = "https://www.lat91.co.jp"

async function getAllArticles(): Promise<Pick<Article, "id" | "publishedAt" | "updatedAt">[]> {
  if (!client) return []
  try {
    const data = await client.getList<Article>({
      endpoint: "media",
      queries: {
        fields: "id,publishedAt,updatedAt",
        limit: 100,
        orders: "-publishedAt",
      },
    })
    return data.contents
  } catch (e) {
    console.error("sitemap: failed to fetch articles from microCMS:", e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const lastModified = new Date("2026-05-08")

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/service`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/baramaki-ai`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/insta-lead-ai`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/talksite-ai`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/treal`, lastModified: new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/company`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/media`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/philosophy`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/media/${a.id}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
