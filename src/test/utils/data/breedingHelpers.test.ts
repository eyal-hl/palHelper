import { describe, it, expect } from 'vitest'
import { getOffspring, getParentCombos, isSpecialCombo } from '@/utils/data/breedingHelpers'

describe('isSpecialCombo', () => {
  it('returns true for a known special combo', () => {
    expect(isSpecialCombo('relaxaurus', 'sparkit')).toBe(true)
  })

  it('returns true regardless of parent order', () => {
    expect(isSpecialCombo('sparkit', 'relaxaurus')).toBe(true)
  })

  it('returns false for a normal pair', () => {
    expect(isSpecialCombo('lamball', 'cattiva')).toBe(false)
  })
})

describe('getOffspring', () => {
  it('returns the hardcoded child for a known special combo', () => {
    const child = getOffspring('relaxaurus', 'sparkit')
    expect(child).toBeDefined()
    expect(child?.id).toBe('relaxaurus_lux')
  })

  it('parent order does not matter for special combos', () => {
    const child1 = getOffspring('relaxaurus', 'sparkit')
    const child2 = getOffspring('sparkit', 'relaxaurus')
    expect(child1?.id).toBe(child2?.id)
  })

  it('returns pal with breedingPower closest to floor((bp1+bp2+1)/2) for normal pairs', () => {
    // lamball bp=1500, foxparks bp=1460 -> avg = floor((1500+1460+1)/2) = floor(2961/2) = 1480
    // chikipi has bp=1480, so it should be returned
    const child = getOffspring('lamball', 'foxparks')
    expect(child).toBeDefined()
    expect(child?.breedingPower).toBe(1480)
  })

  it('on tie picks pal with lower breedingPower', () => {
    // lamball bp=1500, cattiva bp=1490 -> avg = floor((1500+1490+1)/2) = floor(2991/2) = 1495
    // lamball diff=5, cattiva diff=5 -> tie -> pick lower -> cattiva (1490)
    const child = getOffspring('lamball', 'cattiva')
    expect(child).toBeDefined()
    expect(child?.id).toBe('cattiva')
  })

  it('works when both parents are the same pal', () => {
    // lamball bp=1500 -> avg = floor((1500+1500+1)/2) = 1500 -> lamball
    const child = getOffspring('lamball', 'lamball')
    expect(child).toBeDefined()
    expect(child?.id).toBe('lamball')
  })

  it('returns undefined for unknown pal id', () => {
    expect(getOffspring('nonexistent', 'lamball')).toBeUndefined()
    expect(getOffspring('lamball', 'nonexistent')).toBeUndefined()
  })
})

describe('getParentCombos', () => {
  it('returns pairs that produce the given child', () => {
    // relaxaurus_lux is a special combo child
    const combos = getParentCombos('relaxaurus_lux')
    expect(combos.length).toBeGreaterThan(0)
    expect(
      combos.some((c) => {
        const ids = [c.parent1.id, c.parent2.id]
        return ids.includes('relaxaurus') && ids.includes('sparkit')
      })
    ).toBe(true)
  })

  it('includes special combos that produce the child', () => {
    const combos = getParentCombos('relaxaurus_lux')
    const specialCombo = combos.find((c) => {
      const ids = [c.parent1.id, c.parent2.id]
      return ids.includes('relaxaurus') && ids.includes('sparkit')
    })
    expect(specialCombo).toBeDefined()
  })

  it('returns empty array for unknown child id', () => {
    expect(getParentCombos('nonexistent_pal')).toHaveLength(0)
  })

  it('does not include duplicate pairs (A+B and B+A appear once)', () => {
    const combos = getParentCombos('lamball')
    const seen = new Set<string>()
    for (const combo of combos) {
      const key = [combo.parent1.id, combo.parent2.id].sort().join('|')
      expect(seen.has(key)).toBe(false)
      seen.add(key)
    }
  })
})
