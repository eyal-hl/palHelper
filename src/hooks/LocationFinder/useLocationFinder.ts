import { useState, useMemo } from 'react'
import type { Pal } from '@/data/types'
import { getUniqueLocations, getPalsByLocation } from '@/utils/data/palHelpers'
import { usePalTrackerContext } from '@/context/PalTrackerContext'

interface UseLocationFinderReturn {
  locationQuery: string
  setLocationQuery: (query: string) => void
  selectedLocation: string | null
  setSelectedLocation: (location: string | null) => void
  filteredLocations: string[]
  palsAtLocation: Pal[]
}

export function useLocationFinder(): UseLocationFinderReturn {
  const { ownedPalIds } = usePalTrackerContext()
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const allLocations = useMemo(() => getUniqueLocations(), [])

  const filteredLocations = useMemo(() => {
    if (!locationQuery.trim()) return allLocations
    const q = locationQuery.toLowerCase()
    return allLocations.filter((loc) => loc.toLowerCase().includes(q))
  }, [allLocations, locationQuery])

  const palsAtLocation = useMemo<Pal[]>(() => {
    if (!selectedLocation) return []
    const pals = getPalsByLocation(selectedLocation)
    return [...pals].sort((a, b) => {
      const aOwned = ownedPalIds.has(a.id) ? 0 : 1
      const bOwned = ownedPalIds.has(b.id) ? 0 : 1
      return aOwned - bOwned
    })
  }, [selectedLocation, ownedPalIds])

  return {
    locationQuery,
    setLocationQuery,
    selectedLocation,
    setSelectedLocation,
    filteredLocations,
    palsAtLocation,
  }
}
