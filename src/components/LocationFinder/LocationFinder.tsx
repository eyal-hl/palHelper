import { useLocationFinder } from '@/hooks/LocationFinder/useLocationFinder'
import { getPalsByLocation } from '@/utils/data/palHelpers'
import { SearchInput } from '@/components/shared/SearchInput/SearchInput'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { Badge } from '@/components/shared/Badge/Badge'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import styles from './LocationFinder.module.css'

export function LocationFinder() {
  const {
    locationQuery,
    setLocationQuery,
    selectedLocation,
    setSelectedLocation,
    filteredLocations,
    palsAtLocation,
  } = useLocationFinder()

  if (selectedLocation) {
    return (
      <div className={styles.page}>
        <button
          className={styles.backButton}
          onClick={() => setSelectedLocation(null)}
          type="button"
        >
          ← Back to Locations
        </button>

        <h1 className={styles.locationTitle}>
          <span aria-hidden="true">📍</span> {selectedLocation}
        </h1>
        <p className={styles.palCount}>
          {palsAtLocation.length} pal{palsAtLocation.length !== 1 ? 's' : ''} found here
        </p>

        {palsAtLocation.length > 0 ? (
          <div className={styles.palGrid}>
            {palsAtLocation.map((pal) => (
              <div key={pal.id} className={styles.palCard}>
                <PalImage
                  name={pal.name}
                  imageUrl={pal.imageUrl}
                  elements={pal.elements}
                  size="md"
                />
                <span className={styles.palName}>{pal.name}</span>
                <div className={styles.elements}>
                  {pal.elements.map((el) => (
                    <Badge key={el} label={el} variant="element" element={el} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No pals found at this location" />
        )}
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Location Finder</h1>

      <SearchInput
        value={locationQuery}
        onChange={setLocationQuery}
        placeholder="Search locations..."
      />

      {filteredLocations.length > 0 ? (
        <ul className={styles.locationList} role="list">
          {filteredLocations.map((loc) => {
            const palCount = getPalsByLocation(loc).length
            return (
              <li key={loc}>
                <button
                  className={styles.locationItem}
                  onClick={() => setSelectedLocation(loc)}
                  type="button"
                >
                  <span className={styles.locationIcon} aria-hidden="true">📍</span>
                  <span className={styles.locationName}>{loc}</span>
                  <span className={styles.locationCount}>
                    {palCount} pal{palCount !== 1 ? 's' : ''}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <EmptyState message="No locations found" hint="Try a different search term." />
      )}
    </div>
  )
}
