export const MEDIA_PAGE_SIZE = 24

export const MEDIA_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "AIエージェント", label: "AIエージェント" },
  { id: "AI活用", label: "AI活用" },
  { id: "コラム", label: "コラム" },
  { id: "ニュース", label: "ニュース" },
]

export function mediaPageHref(page = 1, category = "all") {
  const query = new URLSearchParams()
  if (category !== "all") query.set("category", category)
  if (page > 1) query.set("page", String(page))
  return `/media${query.size ? `?${query}` : ""}`
}

export function parseMediaQuery(query: { page?: string | string[]; category?: string | string[] }) {
  const page = query.page === undefined ? 1 : Number(query.page)
  const category = query.category ?? "all"
  if (Array.isArray(query.page) || !Number.isSafeInteger(page) || page < 1 ||
      typeof category !== "string" || !MEDIA_CATEGORIES.some(item => item.id === category)) return null
  return { page, category }
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date(value)).replaceAll("/", ".")
}
