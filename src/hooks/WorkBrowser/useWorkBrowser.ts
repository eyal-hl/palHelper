import { useState, useMemo } from 'react'
import type { Pal, WorkType } from '@/data/types'
import { filterPalsByWorkTypeAndLevel } from '@/utils/data/palHelpers'

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
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType | null>(null)
  const [minLevel, setMinLevel] = useState(1)

  const filteredPals = useMemo<Pal[]>(() => {
    if (!selectedWorkType) return []
    return filterPalsByWorkTypeAndLevel(selectedWorkType, minLevel)
  }, [selectedWorkType, minLevel])

  return {
    selectedWorkType,
    setSelectedWorkType,
    minLevel,
    setMinLevel,
    filteredPals,
    allWorkTypes: ALL_WORK_TYPES,
  }
}
