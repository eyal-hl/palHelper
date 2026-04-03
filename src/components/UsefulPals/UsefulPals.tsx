import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getPalById } from '@/utils/data/palHelpers'
import { Badge } from '@/components/shared/Badge/Badge'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { usePalTrackerContext } from '@/context/PalTrackerContext'
import usefulPalsData from '@/data/usefulPals.json'
import styles from './UsefulPals.module.css'

interface UsefulPalEntry {
  palId: string
  category: string
  whyUseful: string
  keyTrait: string
  howToGet: {
    method: 'catch' | 'breed' | 'both'
    details: string
  }
}

const METHOD_LABELS: Record<string, string> = {
  catch: '🎯 Catch',
  breed: '🥚 Breed',
  both: '🎯 Catch / 🥚 Breed',
}

const ALL_CATEGORY = 'All'

const usefulPals = usefulPalsData as UsefulPalEntry[]

const CATEGORIES = [ALL_CATEGORY, ...Array.from(new Set(usefulPals.map((e) => e.category)))]

export function UsefulPals() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const { ownedPalIds } = usePalTrackerContext()

  const filtered =
    activeCategory === ALL_CATEGORY
      ? usefulPals
      : usefulPals.filter((e) => e.category === activeCategory)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Top Pals</h1>
      <p className={styles.subtitle}>
        The most useful pals in Palworld — what they excel at and how to get them.
      </p>

      <div className={styles.tabs} role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={styles.tab}
            data-active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((entry) => {
          const pal = getPalById(entry.palId)
          if (!pal) return null
          const isOwned = ownedPalIds.has(pal.id)

          return (
            <div key={entry.palId} className={`${styles.card} ${isOwned ? styles.owned : ''}`}>
              {isOwned && (
                <span className={styles.ownedBadge} title="Owned" aria-label="Owned">
                  ✓
                </span>
              )}
              <div className={styles.cardHeader}>
                <PalImage
                  name={pal.name}
                  imageUrl={pal.imageUrl}
                  elements={pal.elements}
                  size="md"
                />
                <div className={styles.palInfo}>
                  <Link to={`/pals/${pal.id}`} className={styles.palName}>
                    <span className={styles.palNumber}>
                      #{pal.paldeckNumber}
                      {pal.paldeckVariant ?? ''}
                    </span>
                    {pal.name}
                  </Link>
                  <div className={styles.elements}>
                    {pal.elements.map((el) => (
                      <Badge key={el} label={el} variant="element" element={el} />
                    ))}
                    {pal.paldeckVariant && <Badge label="Variant" variant="variant" />}
                  </div>
                </div>
              </div>

              <div className={styles.keyTrait}>{entry.keyTrait}</div>

              <p className={styles.whyUseful}>{entry.whyUseful}</p>

              <div className={styles.howToGet}>
                <span className={styles.methodBadge}>
                  {METHOD_LABELS[entry.howToGet.method]}
                </span>
                <p className={styles.howDetails}>{entry.howToGet.details}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
