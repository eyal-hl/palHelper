import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/shared/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('persists a value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''))
    act(() => result.current[1]('hello'))
    expect(result.current[0]).toBe('hello')
    expect(JSON.parse(localStorage.getItem('test-key') ?? 'null')).toBe('hello')
  })

  it('reads an existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('handles arrays', () => {
    const { result } = renderHook(() => useLocalStorage<string[]>('arr-key', []))
    act(() => result.current[1](['a', 'b']))
    expect(result.current[0]).toEqual(['a', 'b'])
  })
})
