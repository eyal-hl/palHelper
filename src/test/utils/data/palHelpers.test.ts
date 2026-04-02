import { describe, it, expect } from 'vitest'
import {
  getAllPals,
  getPalById,
  getPalsByMaterialId,
  searchPals,
  getTotalPalCount,
  filterPalsByWorkTypeAndLevel,
  getUniqueLocations,
  getPalsByLocation,
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

describe('filterPalsByWorkTypeAndLevel', () => {
  it('returns all pals with the given work type at any level when minLevel is 1', () => {
    const results = filterPalsByWorkTypeAndLevel('kindling', 1)
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.every((p) => p.workSuitabilities.some((ws) => ws.type === 'kindling'))
    ).toBe(true)
  })

  it('returns only pals at or above the minimum level', () => {
    const results = filterPalsByWorkTypeAndLevel('kindling', 3)
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.every((p) =>
        p.workSuitabilities.some((ws) => ws.type === 'kindling' && ws.level >= 3)
      )
    ).toBe(true)
  })

  it('results are sorted by level descending', () => {
    const results = filterPalsByWorkTypeAndLevel('kindling', 1)
    for (let i = 1; i < results.length; i++) {
      const prevLevel = results[i - 1].workSuitabilities.find((ws) => ws.type === 'kindling')!.level
      const currLevel = results[i].workSuitabilities.find((ws) => ws.type === 'kindling')!.level
      expect(prevLevel).toBeGreaterThanOrEqual(currLevel)
    }
  })

  it('returns empty array for a work type no pal has', () => {
    // Using a level so high that no pal has it
    const results = filterPalsByWorkTypeAndLevel('kindling', 99)
    expect(results).toHaveLength(0)
  })
})

describe('getUniqueLocations', () => {
  it('returns a non-empty sorted deduplicated list', () => {
    const locs = getUniqueLocations()
    expect(locs.length).toBeGreaterThan(0)
    // Check sorted
    for (let i = 1; i < locs.length; i++) {
      expect(locs[i - 1].localeCompare(locs[i])).toBeLessThanOrEqual(0)
    }
    // Check deduplicated
    expect(new Set(locs).size).toBe(locs.length)
  })
})

describe('getPalsByLocation', () => {
  it('returns correct pals for a known location', () => {
    const results = getPalsByLocation('Windswept Hills')
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.every((p) =>
        p.locations.some((l) => l.toLowerCase() === 'windswept hills')
      )
    ).toBe(true)
  })

  it('is case-insensitive', () => {
    const upper = getPalsByLocation('WINDSWEPT HILLS')
    const lower = getPalsByLocation('windswept hills')
    expect(upper.length).toBe(lower.length)
    expect(upper.map((p) => p.id).sort()).toEqual(lower.map((p) => p.id).sort())
  })

  it('returns empty array for unknown location', () => {
    expect(getPalsByLocation('Nonexistent Place')).toHaveLength(0)
  })
})
