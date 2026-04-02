import { describe, it, expect } from 'vitest'
import { suggestPalsForBase } from '@/utils/data/baseBuilderHelpers'
import { getAllPals } from '@/utils/data/palHelpers'

describe('suggestPalsForBase', () => {
  it('returns only owned pals in results', () => {
    const ownedIds = new Set(['lamball', 'foxparks', 'cattiva'])
    const slots = [{ workType: 'handiwork' as const, count: 3 }]
    const result = suggestPalsForBase(ownedIds, slots)
    const pals = result.get('handiwork') ?? []
    expect(pals.every((p) => ownedIds.has(p.id))).toBe(true)
  })

  it('results are sorted by work level descending', () => {
    // Use all pals to ensure we have diverse levels
    const allPals = getAllPals()
    const ownedIds = new Set(allPals.map((p) => p.id))
    const slots = [{ workType: 'kindling' as const, count: 10 }]
    const result = suggestPalsForBase(ownedIds, slots)
    const pals = result.get('kindling') ?? []
    if (pals.length > 1) {
      for (let i = 1; i < pals.length; i++) {
        const prevLevel = pals[i - 1].workSuitabilities.find((ws) => ws.type === 'kindling')!.level
        const currLevel = pals[i].workSuitabilities.find((ws) => ws.type === 'kindling')!.level
        expect(prevLevel).toBeGreaterThanOrEqual(currLevel)
      }
    }
  })

  it('respects count limit per work type', () => {
    const allPals = getAllPals()
    const ownedIds = new Set(allPals.map((p) => p.id))
    const count = 2
    const slots = [{ workType: 'kindling' as const, count }]
    const result = suggestPalsForBase(ownedIds, slots)
    const pals = result.get('kindling') ?? []
    expect(pals.length).toBeLessThanOrEqual(count)
  })

  it('a pal can appear in results for multiple work types', () => {
    // Find a pal with multiple work suitabilities
    const allPals = getAllPals()
    const multiWorker = allPals.find((p) => p.workSuitabilities.length >= 2)
    expect(multiWorker).toBeDefined()
    const ownedIds = new Set([multiWorker!.id])
    const workTypes = multiWorker!.workSuitabilities.map((ws) => ws.type as never)
    const slots = multiWorker!.workSuitabilities.map((ws) => ({ workType: ws.type, count: 1 }))
    const result = suggestPalsForBase(ownedIds, slots)
    // Pal should appear in at least 2 work type results
    let appearances = 0
    for (const ws of multiWorker!.workSuitabilities) {
      const pals = result.get(ws.type) ?? []
      if (pals.some((p) => p.id === multiWorker!.id)) appearances++
    }
    expect(appearances).toBeGreaterThanOrEqual(2)
    void workTypes // suppress unused warning
  })

  it('returns empty results for empty owned set', () => {
    const ownedIds = new Set<string>()
    const slots = [{ workType: 'kindling' as const, count: 3 }]
    const result = suggestPalsForBase(ownedIds, slots)
    const pals = result.get('kindling') ?? []
    expect(pals).toHaveLength(0)
  })

  it('work type with no qualifying owned pals returns empty array', () => {
    // Use a pal that only has handiwork, then request kindling
    const allPals = getAllPals()
    const handiworkOnlyPal = allPals.find(
      (p) =>
        p.workSuitabilities.some((ws) => ws.type === 'handiwork') &&
        !p.workSuitabilities.some((ws) => ws.type === 'kindling')
    )
    expect(handiworkOnlyPal).toBeDefined()
    const ownedIds = new Set([handiworkOnlyPal!.id])
    const slots = [{ workType: 'kindling' as const, count: 3 }]
    const result = suggestPalsForBase(ownedIds, slots)
    expect(result.get('kindling') ?? []).toHaveLength(0)
  })
})
