import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/shared/useLocalStorage'

interface PalTrackerState {
  ownedPalIds: Set<string>
}

type PalTrackerAction =
  | { type: 'TOGGLE_PAL'; palId: string }
  | { type: 'LOAD'; palIds: string[] }
  | { type: 'CLEAR_ALL' }

function palTrackerReducer(state: PalTrackerState, action: PalTrackerAction): PalTrackerState {
  switch (action.type) {
    case 'TOGGLE_PAL': {
      const next = new Set(state.ownedPalIds)
      if (next.has(action.palId)) {
        next.delete(action.palId)
      } else {
        next.add(action.palId)
      }
      return { ownedPalIds: next }
    }
    case 'LOAD':
      return { ownedPalIds: new Set(action.palIds) }
    case 'CLEAR_ALL':
      return { ownedPalIds: new Set() }
  }
}

interface PalTrackerContextValue {
  ownedPalIds: Set<string>
  togglePal: (palId: string) => void
  clearAll: () => void
}

const PalTrackerContext = createContext<PalTrackerContextValue | null>(null)

const STORAGE_KEY = 'palHelper_trackedPals'

export function PalTrackerProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage<string[]>(STORAGE_KEY, [])

  const [state, dispatch] = useReducer(palTrackerReducer, {
    ownedPalIds: new Set<string>(stored),
  })

  // Sync state → localStorage whenever ownedPalIds changes
  useEffect(() => {
    setStored([...state.ownedPalIds])
  }, [state.ownedPalIds, setStored])

  const togglePal = (palId: string) => dispatch({ type: 'TOGGLE_PAL', palId })
  const clearAll = () => dispatch({ type: 'CLEAR_ALL' })

  return (
    <PalTrackerContext.Provider value={{ ownedPalIds: state.ownedPalIds, togglePal, clearAll }}>
      {children}
    </PalTrackerContext.Provider>
  )
}

export function usePalTrackerContext(): PalTrackerContextValue {
  const ctx = useContext(PalTrackerContext)
  if (!ctx) throw new Error('usePalTrackerContext must be used within PalTrackerProvider')
  return ctx
}
