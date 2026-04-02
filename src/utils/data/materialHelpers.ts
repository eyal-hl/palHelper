import type { Material } from '@/data/types'
import materialsData from '@/data/materials.json'
import { matchesQuery } from '@/utils/shared/search'

const materials = materialsData as Material[]

export function getAllMaterials(): Material[] {
  return materials
}

export function getMaterialById(id: string): Material | undefined {
  return materials.find((m) => m.id === id)
}

export function getMaterialsByPalId(palId: string): Material[] {
  return materials.filter((material) => material.sources.some((source) => source.palId === palId))
}

export function searchMaterials(query: string): Material[] {
  if (!query.trim()) return materials
  return materials.filter((material) =>
    matchesQuery(query, material.name, material.description, material.category)
  )
}
