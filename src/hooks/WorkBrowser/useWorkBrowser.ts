import { useState, useMemo } from 'react'
import type { Pal, WorkType } from '@/data/types'
import { filterPalsByWorkTypeAndLevel } from '@/utils/data/palHelpers'
import { usePalTrackerContext } from '@/context/PalTrackerContext'

const ALL_WORK_TYPES: WorkType[] = [
  'kindling',
  'watering',
  'planting',
  'generating',
  'handiwork',
  'gathering',
  'lumbering',
  'mining',
  'medicine',
  'transporting',
  'farming',
  'cooling',
]

interface UseWorkBrowserReturn {
  selectedWorkType: WorkType | null
  setSelectedWorkType: (workType: WorkType | null) => void
  minLevel: number
  setMinLevel: (level: number) => void
  filteredPals: Pal[]
  allWorkTypes: WorkType[]
}

export function useWorkBrowser(): UseWorkBrowserReturn {
  const { ownedPalIds } = usePalTrackerContext()
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType | null>(null)
  const [minLevel, setMinLevel] = useState(1)

  const filteredPals = useMemo<Pal[]>(() => {
    if (!selectedWorkType) return []
    const pals = filterPalsByWorkTypeAndLevel(selectedWorkType, minLevel)
    return [...pals].sort((a, b) => {
      const aOwned = ownedPalIds.has(a.id) ? 0 : 1
      const bOwned = ownedPalIds.has(b.id) ? 0 : 1
      return aOwned - bOwned
    })
  }, [selectedWorkType, minLevel, ownedPalIds])

  return {
    selectedWorkType,
    setSelectedWorkType,
    minLevel,
    setMinLevel,
    filteredPals,
    allWorkTypes: ALL_WORK_TYPES,
  }
}
