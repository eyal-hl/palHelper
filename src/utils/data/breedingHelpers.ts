import type { Pal } from '@/data/types'
import type { SpecialBreedingCombo } from '@/data/types'
import palsData from '@/data/pals.json'
import specialCombosData from '@/data/specialBreedingCombos.json'
import { getPalById } from '@/utils/data/palHelpers'

const pals = palsData as Pal[]
const specialCombos = specialCombosData as SpecialBreedingCombo[]

export function isSpecialCombo(parent1Id: string, parent2Id: string): boolean {
  return specialCombos.some(
    (combo) =>
      (combo.parent1Id === parent1Id && combo.parent2Id === parent2Id) ||
      (combo.parent1Id === parent2Id && combo.parent2Id === parent1Id)
  )
}

function findSpecialComboChild(parent1Id: string, parent2Id: string): Pal | undefined {
  const combo = specialCombos.find(
    (c) =>
      (c.parent1Id === parent1Id && c.parent2Id === parent2Id) ||
      (c.parent1Id === parent2Id && c.parent2Id === parent1Id)
  )
  if (!combo) return undefined
  return getPalById(combo.childId)
}

export function getOffspring(parent1Id: string, parent2Id: string): Pal | undefined {
  const parent1 = getPalById(parent1Id)
  const parent2 = getPalById(parent2Id)

  if (!parent1 || !parent2) return undefined

  const specialChild = findSpecialComboChild(parent1Id, parent2Id)
  if (specialChild) return specialChild

  const avgPower = Math.floor((parent1.breedingPower + parent2.breedingPower + 1) / 2)

  let closest: Pal | undefined
  let closestDiff = Infinity

  for (const pal of pals) {
    const diff = Math.abs(pal.breedingPower - avgPower)
    if (
      diff < closestDiff ||
      (diff === closestDiff && closest !== undefined && pal.breedingPower < closest.breedingPower)
    ) {
      closest = pal
      closestDiff = diff
    }
  }

  return closest
}

export function getParentCombos(childId: string): Array<{ parent1: Pal; parent2: Pal }> {
  const child = getPalById(childId)
  if (!child) return []

  const results: Array<{ parent1: Pal; parent2: Pal }> = []
  const seen = new Set<string>()

  for (let i = 0; i < pals.length; i++) {
    for (let j = i; j < pals.length; j++) {
      const p1 = pals[i]
      const p2 = pals[j]
      const offspring = getOffspring(p1.id, p2.id)
      if (offspring?.id === childId) {
        const key = [p1.id, p2.id].sort().join('|')
        if (!seen.has(key)) {
          seen.add(key)
          results.push({ parent1: p1, parent2: p2 })
        }
      }
    }
  }

  return results
}
