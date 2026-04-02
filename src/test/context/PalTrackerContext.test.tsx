import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'
import { PalTrackerProvider, usePalTrackerContext } from '@/context/PalTrackerContext'

function wrapper({ children }: { children: ReactNode }) {
  return <PalTrackerProvider>{children}</PalTrackerProvider>
}

describe('PalTrackerContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts with no owned pals', () => {
    const { result } = renderHook(() => usePalTrackerContext(), { wrapper })
    expect(result.current.ownedPalIds.size).toBe(0)
  })

  it('toggles a pal on', () => {
    const { result } = renderHook(() => usePalTrackerContext(), { wrapper })
    act(() => result.current.togglePal('lamball'))
    expect(result.current.ownedPalIds.has('lamball')).toBe(true)
  })

  it('toggles a pal off when already owned', () => {
    const { result } = renderHook(() => usePalTrackerContext(), { wrapper })
    act(() => result.current.togglePal('lamball'))
    act(() => result.current.togglePal('lamball'))
    expect(result.current.ownedPalIds.has('lamball')).toBe(false)
  })

  it('clears all pals', () => {
    const { result } = renderHook(() => usePalTrackerContext(), { wrapper })
    act(() => result.current.togglePal('lamball'))
    act(() => result.current.togglePal('foxparks'))
    act(() => result.current.clearAll())
    expect(result.current.ownedPalIds.size).toBe(0)
  })

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => usePalTrackerContext())).toThrow()
  })
})
