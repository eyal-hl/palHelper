import { useState, useMemo } from 'react'
import { useDebounce } from '@/hooks/shared/useDebounce'
import { getAllPals, searchPals } from '@/utils/data/palHelpers'
import type { Element, Pal } from '@/data/types'

interface UsePalFilterResult {
  query: string
  setQuery: (q: string) => void
  elementFilter: Element | null
  setElementFilter: (el: Element | null) => void
  filteredPals: Pal[]
  totalCount: number
}

export function usePalFilter(): UsePalFilterResult {
  const [query, setQuery] = useState('')
  const [elementFilter, setElementFilter] = useState<Element | null>(null)
  const debouncedQuery = useDebounce(query)

  const totalCount = getAllPals().length

  const filteredPals = useMemo(() => {
    let results = searchPals(debouncedQuery)
    if (elementFilter) {
      results = results.filter((pal) => pal.elements.includes(elementFilter))
    }
    return results.sort((a, b) => a.paldeckNumber - b.paldeckNumber)
  }, [debouncedQuery, elementFilter])

  return { query, setQuery, elementFilter, setElementFilter, filteredPals, totalCount }
}
