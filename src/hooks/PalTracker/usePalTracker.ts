import { useMemo } from 'react'
import { usePalTrackerContext } from '@/context/PalTrackerContext'
import { getAllPals, getTotalPalCount } from '@/utils/data/palHelpers'

interface UsePalTrackerResult {
  ownedPalIds: Set<string>
  isPalOwned: (palId: string) => boolean
  togglePal: (palId: string) => void
  clearAll: () => void
  ownedCount: number
  totalCount: number
  progressPercent: number
  allPals: ReturnType<typeof getAllPals>
}

export function usePalTracker(): UsePalTrackerResult {
  const { ownedPalIds, togglePal, clearAll } = usePalTrackerContext()

  const totalCount = getTotalPalCount()
  const ownedCount = ownedPalIds.size
  const progressPercent = totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0

  const allPals = useMemo(() => getAllPals(), [])

  const isPalOwned = (palId: string) => ownedPalIds.has(palId)

  return {
    ownedPalIds,
    isPalOwned,
    togglePal,
    clearAll,
    ownedCount,
    totalCount,
    progressPercent,
    allPals,
  }
}
