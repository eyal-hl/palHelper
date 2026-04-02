import { useState, useMemo } from 'react'
import type { Pal, WorkType } from '@/data/types'
import { usePalTrackerContext } from '@/context/PalTrackerContext'
import { suggestPalsForBase } from '@/utils/data/baseBuilderHelpers'

export interface WorkSlotState {
  id: string
  workType: WorkType
  count: number
}

interface UseBaseBuilderReturn {
  slots: WorkSlotState[]
  addSlot: () => void
  removeSlot: (id: string) => void
  updateSlot: (id: string, patch: Partial<Omit<WorkSlotState, 'id'>>) => void
  recommendations: Map<WorkType, Pal[]>
}

const DEFAULT_WORK_TYPE: WorkType = 'handiwork'

let slotIdCounter = 0
function generateSlotId(): string {
  slotIdCounter += 1
  return `slot-${slotIdCounter}`
}

export function useBaseBuilder(): UseBaseBuilderReturn {
  const { ownedPalIds } = usePalTrackerContext()
  const [slots, setSlots] = useState<WorkSlotState[]>([])

  function addSlot(): void {
    setSlots((prev) => [
      ...prev,
      { id: generateSlotId(), workType: DEFAULT_WORK_TYPE, count: 1 },
    ])
  }

  function removeSlot(id: string): void {
    setSlots((prev) => prev.filter((s) => s.id !== id))
  }

  function updateSlot(id: string, patch: Partial<Omit<WorkSlotState, 'id'>>): void {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    )
  }

  const recommendations = useMemo<Map<WorkType, Pal[]>>(
    () => suggestPalsForBase(ownedPalIds, slots),
    [ownedPalIds, slots]
  )

  return { slots, addSlot, removeSlot, updateSlot, recommendations }
}
