import { useState, useMemo } from 'react'
import type { Pal } from '@/data/types'
import { getOffspring, getParentCombos } from '@/utils/data/breedingHelpers'
import { usePalTrackerContext } from '@/context/PalTrackerContext'

type Mode = 'forward' | 'reverse'

interface UseBreedingCalculatorReturn {
  mode: Mode
  setMode: (mode: Mode) => void
  parent1Id: string | null
  parent2Id: string | null
  desiredChildId: string | null
  setParent1Id: (id: string | null) => void
  setParent2Id: (id: string | null) => void
  setDesiredChildId: (id: string | null) => void
  offspring: Pal | null
  parentCombos: Array<{ parent1: Pal; parent2: Pal }>
}

export function useBreedingCalculator(): UseBreedingCalculatorReturn {
  const { ownedPalIds } = usePalTrackerContext()
  const [mode, setModeState] = useState<Mode>('forward')
  const [parent1Id, setParent1Id] = useState<string | null>(null)
  const [parent2Id, setParent2Id] = useState<string | null>(null)
  const [desiredChildId, setDesiredChildId] = useState<string | null>(null)

  function setMode(newMode: Mode): void {
    setModeState(newMode)
    if (newMode === 'reverse') {
      setParent1Id(null)
      setParent2Id(null)
    } else {
      setDesiredChildId(null)
    }
  }

  const offspring = useMemo<Pal | null>(() => {
    if (mode !== 'forward') return null
    if (!parent1Id || !parent2Id) return null
    return getOffspring(parent1Id, parent2Id) ?? null
  }, [mode, parent1Id, parent2Id])

  const parentCombos = useMemo<Array<{ parent1: Pal; parent2: Pal }>>(() => {
    if (mode !== 'reverse') return []
    if (!desiredChildId) return []
    const combos = getParentCombos(desiredChildId)
    return [...combos].sort((a, b) => {
      const aOwned =
        (ownedPalIds.has(a.parent1.id) ? 1 : 0) + (ownedPalIds.has(a.parent2.id) ? 1 : 0)
      const bOwned =
        (ownedPalIds.has(b.parent1.id) ? 1 : 0) + (ownedPalIds.has(b.parent2.id) ? 1 : 0)
      return bOwned - aOwned
    })
  }, [mode, desiredChildId, ownedPalIds])

  return {
    mode,
    setMode,
    parent1Id,
    parent2Id,
    desiredChildId,
    setParent1Id,
    setParent2Id,
    setDesiredChildId,
    offspring,
    parentCombos,
  }
}
