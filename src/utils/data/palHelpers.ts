import type { Pal, Element, WorkType, AcquisitionMethod } from '@/data/types'
import palsData from '@/data/pals.json'
import { matchesQuery } from '@/utils/shared/search'

export interface PalMaterialSource {
  pal: Pal
  method: AcquisitionMethod
  rate?: string
}

const pals = palsData as Pal[]

export function getAllPals(): Pal[] {
  return pals
}

export function getPalById(id: string): Pal | undefined {
  return pals.find((p) => p.id === id)
}

export function getPalsByMaterialId(materialId: string): Pal[] {
  return pals.filter((pal) => pal.drops.some((drop) => drop.materialId === materialId))
}

export function searchPals(query: string): Pal[] {
  if (!query.trim()) return pals
  return pals.filter((pal) => matchesQuery(query, pal.name, pal.description, ...pal.locations))
}

export function filterPalsByElement(element: Element): Pal[] {
  return pals.filter((pal) => pal.elements.includes(element))
}

export function filterPalsByWorkType(workType: WorkType): Pal[] {
  return pals.filter((pal) => pal.workSuitabilities.some((ws) => ws.type === workType))
}

export function getTotalPalCount(): number {
  return pals.length
}

export function filterPalsByWorkTypeAndLevel(workType: WorkType, minLevel: number): Pal[] {
  return pals
    .filter((pal) =>
      pal.workSuitabilities.some((ws) => ws.type === workType && ws.level >= minLevel)
    )
    .sort((a, b) => {
      const aLevel = a.workSuitabilities.find((ws) => ws.type === workType)!.level
      const bLevel = b.workSuitabilities.find((ws) => ws.type === workType)!.level
      return bLevel - aLevel
    })
}

export function getUniqueLocations(): string[] {
  const locationSet = new Set<string>()
  for (const pal of pals) {
    for (const loc of pal.locations) {
      locationSet.add(loc)
    }
  }
  return [...locationSet].sort()
}

export function getPalsByLocation(location: string): Pal[] {
  const query = location.toLowerCase()
  return pals.filter((pal) => pal.locations.some((loc) => loc.toLowerCase() === query))
}

export function getPalSourcesForMaterial(materialId: string): PalMaterialSource[] {
  const sources: PalMaterialSource[] = []
  for (const pal of pals) {
    for (const drop of pal.drops) {
      if (drop.materialId === materialId) {
        sources.push({ pal, method: drop.method, rate: drop.rate })
      }
    }
  }
  return sources
}
