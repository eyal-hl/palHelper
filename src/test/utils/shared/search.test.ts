import { describe, it, expect } from 'vitest'
import { matchesQuery, normalizeQuery } from '@/utils/shared/search'

describe('matchesQuery', () => {
  it('returns true when query is empty', () => {
    expect(matchesQuery('', 'Wool')).toBe(true)
    expect(matchesQuery('  ', 'Wool')).toBe(true)
  })

  it('matches case-insensitively', () => {
    expect(matchesQuery('wool', 'Wool')).toBe(true)
    expect(matchesQuery('WOOL', 'Wool')).toBe(true)
    expect(matchesQuery('Wool', 'wool')).toBe(true)
  })

  it('matches substrings', () => {
    expect(matchesQuery('oo', 'Wool')).toBe(true)
    expect(matchesQuery('lam', 'Lamball')).toBe(true)
  })

  it('returns false when no field matches', () => {
    expect(matchesQuery('xyz', 'Wool', 'Leather')).toBe(false)
  })

  it('returns true if any field matches', () => {
    expect(matchesQuery('leather', 'Wool', 'Leather')).toBe(true)
  })

  it('handles undefined fields gracefully', () => {
    expect(matchesQuery('wool', undefined, 'Wool')).toBe(true)
    expect(matchesQuery('wool', undefined, undefined)).toBe(false)
  })
})

describe('normalizeQuery', () => {
  it('lowercases and trims', () => {
    expect(normalizeQuery('  WOOL  ')).toBe('wool')
    expect(normalizeQuery('Lamball')).toBe('lamball')
  })
})
