import "server-only"
import { client } from "./client"
import type { Article } from "./types"
import { MEDIA_PAGE_SIZE } from "@/lib/media-navigation"

export type ArticleCard = Pick<Article, "id" | "title" | "category" | "thumbnail" | "summary" | "readingTime" | "featured" | "publishedAt" | "createdAt" | "updatedAt">
const cardFields = "id,title,category,thumbnail,summary,readingTime,featured,publishedAt,createdAt,updatedAt"

function requireClient() {
  if (!client) throw new Error("microCMS is not configured")
  return client
}

export async function getArticleCards(page = 1, category = "all", limit = MEDIA_PAGE_SIZE) {
  return requireClient().getList<ArticleCard>({
    endpoint: "media",
    queries: {
      fields: cardFields,
      orders: "-publishedAt,-id",
      limit,
      offset: (page - 1) * limit,
      ...(category !== "all" ? { filters: `category[contains]${category}` } : {}),
    },
    customRequestInit: { next: { revalidate: 60 } },
  })
}

export async function getSitemapArticles() {
  // The SDK traverses every page; one getList request is capped at 100 items.
  // Let failures propagate so ISR retains the last successful sitemap.
  return requireClient().getAllContents<Pick<Article, "id" | "publishedAt" | "updatedAt">>({
    endpoint: "media",
    queries: { fields: "id,publishedAt,updatedAt", orders: "-publishedAt,-id" },
    customRequestInit: { next: { revalidate: 60 } },
  })
}
