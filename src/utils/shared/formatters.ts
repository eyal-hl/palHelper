import type { WorkType, AcquisitionMethod } from '@/data/types'

export function formatWorkType(type: WorkType): string {
  const labels: Record<WorkType, string> = {
    kindling: 'Kindling',
    watering: 'Watering',
    planting: 'Planting',
    generating: 'Generating Electricity',
    handiwork: 'Handiwork',
    gathering: 'Gathering',
    lumbering: 'Lumbering',
    mining: 'Mining',
    medicine: 'Medicine Production',
    transporting: 'Transporting',
    farming: 'Farming',
    cooling: 'Cooling',
  }
  return labels[type]
}

export function formatAcquisitionMethod(method: AcquisitionMethod): string {
  const labels: Record<AcquisitionMethod, string> = {
    drop: 'Drop',
    farming: 'Ranch/Farming',
    butchering: 'Butchering',
  }
  return labels[method]
}

export function formatDropRate(rate: string | undefined): string {
  if (!rate) return ''
  const labels: Record<string, string> = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
  }
  return labels[rate] ?? rate
}
