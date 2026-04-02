import { useState, useMemo } from 'react'
import { SearchInput } from '@/components/shared/SearchInput/SearchInput'
import { TrackerPalRow } from './TrackerPalRow/TrackerPalRow'
import { usePalTracker } from '@/hooks/PalTracker/usePalTracker'
import { matchesQuery } from '@/utils/shared/search'
import { useDebounce } from '@/hooks/shared/useDebounce'
import styles from './PalTracker.module.css'

type FilterMode = 'all' | 'owned' | 'missing'

export function PalTracker() {
  const { allPals, isPalOwned, togglePal, ownedCount, totalCount, progressPercent, clearAll } =
    usePalTracker()
  const [query, setQuery] = useState('')
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const debouncedQuery = useDebounce(query)

  const displayedPals = useMemo(() => {
    let result = allPals

    if (filterMode === 'owned') result = result.filter((p) => isPalOwned(p.id))
    if (filterMode === 'missing') result = result.filter((p) => !isPalOwned(p.id))

    if (debouncedQuery.trim()) {
      result = result.filter((p) => matchesQuery(debouncedQuery, p.name))
    }

    return result
  }, [allPals, filterMode, debouncedQuery, isPalOwned])

  const handleClearAll = () => {
    if (window.confirm('Clear all tracked Pals? This cannot be undone.')) {
      clearAll()
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Pal Tracker</h1>
          <p className={styles.subtitle}>Track which Pals you have caught or bred.</p>
        </div>
        {ownedCount > 0 && (
          <button className={styles.clearButton} onClick={handleClearAll} type="button">
            Clear All
          </button>
        )}
      </div>

      <div className={styles.progress}>
        <div className={styles.progressStats}>
          <span className={styles.progressCount}>
            <strong>{ownedCount}</strong> / {totalCount} Pals
          </span>
          <span className={styles.progressPercent}>{progressPercent}%</span>
        </div>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <SearchInput value={query} onChange={setQuery} placeholder="Search Pals..." />
        </div>
        <div className={styles.filterTabs} role="group" aria-label="Filter Pals">
          {(['all', 'owned', 'missing'] as FilterMode[]).map((mode) => (
            <button
              key={mode}
              className={`${styles.filterTab} ${filterMode === mode ? styles.filterTabActive : ''}`}
              onClick={() => setFilterMode(mode)}
              type="button"
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.listContainer}>
        <ul className={styles.list} role="list">
          {displayedPals.length === 0 ? (
            <li className={styles.emptyItem}>No Pals match your filters.</li>
          ) : (
            displayedPals.map((pal) => (
              <TrackerPalRow
                key={pal.id}
                pal={pal}
                isOwned={isPalOwned(pal.id)}
                onToggle={togglePal}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
