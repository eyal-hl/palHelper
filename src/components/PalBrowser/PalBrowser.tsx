import { SearchInput } from '@/components/shared/SearchInput/SearchInput'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import { Badge } from '@/components/shared/Badge/Badge'
import { PalCard } from './PalCard/PalCard'
import { usePalFilter } from '@/hooks/PalBrowser/usePalFilter'
import type { Element } from '@/data/types'
import styles from './PalBrowser.module.css'

const ELEMENTS: Element[] = [
  'Neutral',
  'Fire',
  'Water',
  'Leaf',
  'Electricity',
  'Ice',
  'Earth',
  'Dark',
  'Dragon',
]

export function PalBrowser() {
  const { query, setQuery, elementFilter, setElementFilter, filteredPals, totalCount } =
    usePalFilter()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Pal Browser</h1>
      <p className={styles.subtitle}>
        Browse all Pals — showing {filteredPals.length} of {totalCount}.
      </p>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <SearchInput value={query} onChange={setQuery} placeholder="Search Pals..." autoFocus />
        </div>

        <div className={styles.filters} role="group" aria-label="Filter by element">
          <button
            className={`${styles.filterChip} ${elementFilter === null ? styles.filterActive : ''}`}
            onClick={() => setElementFilter(null)}
            type="button"
          >
            All
          </button>
          {ELEMENTS.map((el) => (
            <button
              key={el}
              className={`${styles.filterChip} ${elementFilter === el ? styles.filterActive : ''}`}
              onClick={() => setElementFilter(el === elementFilter ? null : el)}
              type="button"
            >
              <Badge label={el} variant="element" element={el} />
            </button>
          ))}
        </div>
      </div>

      {filteredPals.length === 0 ? (
        <EmptyState
          message="No Pals found"
          hint="Try a different search or remove the element filter"
        />
      ) : (
        <ul className={styles.grid} role="list">
          {filteredPals.map((pal) => (
            <li key={pal.id}>
              <PalCard pal={pal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
