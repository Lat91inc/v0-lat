import "server-only"
import { client } from "./client"

// microCMS の「news」API（リスト形式）。項目は title（テキスト・必須）と body（リッチエディタ・任意）だけ。
export type News = {
  id: string
  title: string
  body?: string
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export type NewsListItem = Pick<News, "id" | "title" | "publishedAt" | "updatedAt">

export const NEWS_PAGE_SIZE = 20
const listFields = "id,title,publishedAt,updatedAt"

function requireClient() {
  if (!client) throw new Error("microCMS is not configured")
  return client
}

// news API がまだ作られていない（404）ときは「0件」として扱う。それ以外の失敗は投げる＝ISRが前回の成功を保つ。
export function isMicroCmsNotFound(error: unknown) {
  return error instanceof Error && /^fetch API response status: 404(?:\s|$)/.test(error.message)
}

export async function getNewsList(page = 1, limit = NEWS_PAGE_SIZE) {
  try {
    return await requireClient().getList<NewsListItem>({
      endpoint: "news",
      queries: { fields: listFields, orders: "-publishedAt,-id", limit, offset: (page - 1) * limit },
      customRequestInit: { next: { revalidate: 60 } },
    })
  } catch (error) {
    if (isMicroCmsNotFound(error)) return { contents: [], totalCount: 0, offset: 0, limit }
    throw error
  }
}

export async function getNews(id: string, draftKey?: string): Promise<News | null> {
  try {
    return await requireClient().get<News>({
      endpoint: "news",
      contentId: id,
      queries: draftKey ? { draftKey } : {},
      customRequestInit: draftKey ? { cache: "no-store" } : { next: { revalidate: 60 } },
    })
  } catch (error) {
    if (isMicroCmsNotFound(error)) return null
    throw new Error("Failed to load news from microCMS")
  }
}

export async function getSitemapNews() {
  try {
    return await requireClient().getAllContents<Pick<News, "id" | "publishedAt" | "updatedAt">>({
      endpoint: "news",
      queries: { fields: "id,publishedAt,updatedAt", orders: "-publishedAt,-id" },
      customRequestInit: { next: { revalidate: 60 } },
    })
  } catch (error) {
    if (isMicroCmsNotFound(error)) return []
    throw error
  }
}
