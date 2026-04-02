/**
 * Case-insensitive substring search across multiple string fields.
 */
export function matchesQuery(query: string, ...fields: (string | undefined)[]): boolean {
  if (!query.trim()) return true
  const normalizedQuery = query.toLowerCase().trim()
  return fields.some((field) => field?.toLowerCase().includes(normalizedQuery))
}

/**
 * Normalize a search query for consistent matching.
 */
export function normalizeQuery(query: string): string {
  return query.toLowerCase().trim()
}
