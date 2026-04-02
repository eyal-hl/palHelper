import type { Pal, WorkType } from '@/data/types'
import { filterPalsByWorkTypeAndLevel } from '@/utils/data/palHelpers'

export interface WorkSlot {
  workType: WorkType
  count: number
}

export function suggestPalsForBase(
  ownedPalIds: Set<string>,
  slots: WorkSlot[]
): Map<WorkType, Pal[]> {
  const result = new Map<WorkType, Pal[]>()

  for (const slot of slots) {
    const candidates = filterPalsByWorkTypeAndLevel(slot.workType, 1).filter((pal) =>
      ownedPalIds.has(pal.id)
    )
    result.set(slot.workType, candidates.slice(0, slot.count))
  }

  return result
}
