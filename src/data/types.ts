export type Element =
  | 'Neutral'
  | 'Fire'
  | 'Water'
  | 'Leaf'
  | 'Electricity'
  | 'Ice'
  | 'Earth'
  | 'Dark'
  | 'Dragon'

export type WorkType =
  | 'kindling'
  | 'watering'
  | 'planting'
  | 'generating'
  | 'handiwork'
  | 'gathering'
  | 'lumbering'
  | 'mining'
  | 'medicine'
  | 'transporting'
  | 'farming'
  | 'cooling'

export type AcquisitionMethod = 'drop' | 'farming' | 'butchering'

export interface PalDrop {
  materialId: string
  method: AcquisitionMethod
  /** Drop rate description, e.g. "common", "rare", or a percentage */
  rate?: string
}

export interface WorkSuitability {
  type: WorkType
  level: number
}

export interface Pal {
  id: string
  name: string
  paldeckNumber: number
  elements: Element[]
  description: string
  partnerSkill: string
  workSuitabilities: WorkSuitability[]
  drops: PalDrop[]
  /** Location names or area descriptions */
  locations: string[]
  imageUrl?: string
  /** Breeding power (CombiRank). Higher = weaker/more common pal. Used for breeding offspring calculation. */
  breedingPower: number
  /** Capture rate 1-100. Higher = easier to catch. */
  captureRate: number
}

export interface SpecialBreedingCombo {
  parent1Id: string
  parent2Id: string
  childId: string
}

export type MaterialCategory =
  | 'material'
  | 'food'
  | 'ore'
  | 'wood'
  | 'fiber'
  | 'medicine'
  | 'key_item'
  | 'other'

export interface MaterialSource {
  palId: string
  method: AcquisitionMethod
  rate?: string
}

export interface Material {
  id: string
  name: string
  category: MaterialCategory
  description: string
  sources: MaterialSource[]
  imageUrl?: string
}
