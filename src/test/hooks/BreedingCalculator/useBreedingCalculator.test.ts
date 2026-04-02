import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBreedingCalculator } from '@/hooks/BreedingCalculator/useBreedingCalculator'
import { PalTrackerProvider } from '@/context/PalTrackerContext'

const wrapper = PalTrackerProvider

describe('useBreedingCalculator', () => {
  it('defaults to forward mode', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    expect(result.current.mode).toBe('forward')
  })

  it('offspring is null when only one parent is set', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => result.current.setParent1Id('lamball'))
    expect(result.current.offspring).toBeNull()
  })

  it('computes offspring when both parents are set', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => {
      result.current.setParent1Id('lamball')
      result.current.setParent2Id('foxparks')
    })
    expect(result.current.offspring).toBeDefined()
    expect(result.current.offspring).not.toBeNull()
  })

  it('computes correct special combo offspring', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => {
      result.current.setParent1Id('relaxaurus')
      result.current.setParent2Id('sparkit')
    })
    expect(result.current.offspring?.id).toBe('relaxaurus_lux')
  })

  it('computes parentCombos when desiredChildId is set in reverse mode', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => result.current.setMode('reverse'))
    act(() => result.current.setDesiredChildId('relaxaurus_lux'))
    expect(result.current.parentCombos.length).toBeGreaterThan(0)
  })

  it('parentCombos is empty when no desiredChildId in reverse mode', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => result.current.setMode('reverse'))
    expect(result.current.parentCombos).toHaveLength(0)
  })

  it('switching to reverse mode clears forward offspring', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => {
      result.current.setParent1Id('lamball')
      result.current.setParent2Id('foxparks')
    })
    expect(result.current.offspring).not.toBeNull()
    act(() => result.current.setMode('reverse'))
    expect(result.current.offspring).toBeNull()
  })

  it('switching to forward mode clears reverse parentCombos', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => result.current.setMode('reverse'))
    act(() => result.current.setDesiredChildId('relaxaurus_lux'))
    expect(result.current.parentCombos.length).toBeGreaterThan(0)
    act(() => result.current.setMode('forward'))
    expect(result.current.parentCombos).toHaveLength(0)
  })

  it('offspring is null when either parent is cleared', () => {
    const { result } = renderHook(() => useBreedingCalculator(), { wrapper })
    act(() => {
      result.current.setParent1Id('lamball')
      result.current.setParent2Id('foxparks')
    })
    expect(result.current.offspring).not.toBeNull()
    act(() => result.current.setParent1Id(null))
    expect(result.current.offspring).toBeNull()
  })
})
