import { describe, it, expect } from 'vitest'
import {
  getAllMaterials,
  getMaterialById,
  getMaterialsByPalId,
  searchMaterials,
} from '@/utils/data/materialHelpers'

describe('getAllMaterials', () => {
  it('returns a non-empty array', () => {
    expect(getAllMaterials().length).toBeGreaterThan(0)
  })
})

describe('getMaterialById', () => {
  it('returns a material when found', () => {
    const mat = getMaterialById('wool')
    expect(mat).toBeDefined()
    expect(mat?.name).toBe('Wool')
  })

  it('returns undefined for unknown id', () => {
    expect(getMaterialById('nonexistent')).toBeUndefined()
  })
})

describe('getMaterialsByPalId', () => {
  it('returns materials for lamball', () => {
    const mats = getMaterialsByPalId('lamball')
    expect(mats.length).toBeGreaterThan(0)
    expect(mats.every((m) => m.sources.some((s) => s.palId === 'lamball'))).toBe(true)
  })

  it('returns empty for unknown pal', () => {
    expect(getMaterialsByPalId('nonexistent_pal')).toHaveLength(0)
  })
})

describe('searchMaterials', () => {
  it('returns all materials for empty query', () => {
    expect(searchMaterials('')).toHaveLength(getAllMaterials().length)
  })

  it('filters by name', () => {
    const results = searchMaterials('wool')
    expect(results.some((m) => m.id === 'wool')).toBe(true)
  })

  it('returns empty array for no matches', () => {
    expect(searchMaterials('zzzznonexistent')).toHaveLength(0)
  })
})
