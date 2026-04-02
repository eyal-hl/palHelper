import { describe, it, expect } from 'vitest'
import {
  getAllPals,
  getPalById,
  getPalsByMaterialId,
  searchPals,
  getTotalPalCount,
} from '@/utils/data/palHelpers'

describe('getAllPals', () => {
  it('returns a non-empty array', () => {
    expect(getAllPals().length).toBeGreaterThan(0)
  })
})

describe('getPalById', () => {
  it('returns a pal when found', () => {
    const pal = getPalById('lamball')
    expect(pal).toBeDefined()
    expect(pal?.name).toBe('Lamball')
  })

  it('returns undefined for unknown id', () => {
    expect(getPalById('nonexistent')).toBeUndefined()
  })
})

describe('getPalsByMaterialId', () => {
  it('returns pals that drop wool', () => {
    const pals = getPalsByMaterialId('wool')
    expect(pals.length).toBeGreaterThan(0)
    expect(pals.every((p) => p.drops.some((d) => d.materialId === 'wool'))).toBe(true)
  })

  it('returns empty array for unknown material', () => {
    expect(getPalsByMaterialId('nonexistent_material')).toHaveLength(0)
  })
})

describe('searchPals', () => {
  it('returns all pals for empty query', () => {
    expect(searchPals('')).toHaveLength(getAllPals().length)
  })

  it('filters by name case-insensitively', () => {
    const results = searchPals('lamball')
    expect(results.some((p) => p.id === 'lamball')).toBe(true)
  })

  it('returns empty array for no matches', () => {
    expect(searchPals('zzzzzznonexistent')).toHaveLength(0)
  })
})

describe('getTotalPalCount', () => {
  it('returns a positive number', () => {
    expect(getTotalPalCount()).toBeGreaterThan(0)
  })
})
