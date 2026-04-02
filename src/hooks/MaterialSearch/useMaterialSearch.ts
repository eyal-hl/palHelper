import { useState } from 'react'
import { useDebounce } from '@/hooks/shared/useDebounce'
import { searchMaterials } from '@/utils/data/materialHelpers'
import type { Material } from '@/data/types'

interface UseMaterialSearchResult {
  query: string
  setQuery: (q: string) => void
  results: Material[]
  selectedMaterial: Material | null
  selectMaterial: (material: Material | null) => void
}

export function useMaterialSearch(): UseMaterialSearchResult {
  const [query, setQuery] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const debouncedQuery = useDebounce(query)

  const results = searchMaterials(debouncedQuery)

  const selectMaterial = (material: Material | null) => {
    setSelectedMaterial(material)
  }

  return { query, setQuery, results, selectedMaterial, selectMaterial }
}
