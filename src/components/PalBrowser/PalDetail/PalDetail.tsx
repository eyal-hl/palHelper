import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPalById } from '@/utils/data/palHelpers'
import { getMaterialById } from '@/utils/data/materialHelpers'
import { Badge } from '@/components/shared/Badge/Badge'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import { ItemImage } from '@/components/shared/ItemImage/ItemImage'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { usePalTrackerContext } from '@/context/PalTrackerContext'
import { formatWorkType, formatAcquisitionMethod, formatDropRate } from '@/utils/shared/formatters'
import styles from './PalDetail.module.css'

export function PalDetail() {
  const { palId } = useParams<{ palId: string }>()
  const navigate = useNavigate()
  const { ownedPalIds, togglePal } = usePalTrackerContext()

  const pal = palId ? getPalById(palId) : undefined
  const isOwned = palId ? ownedPalIds.has(palId) : false

  if (!pal) {
    return <EmptyState message="Pal not found" hint="This Pal may not be in the database yet." />
  }

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)} type="button">
        ← Back
      </button>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <PalImage name={pal.name} imageUrl={pal.imageUrl} elements={pal.elements} size="xl" />
          <div className={styles.headerInfo}>
            <span className={styles.palNumber}>#{pal.paldeckNumber}</span>
            <h1 className={styles.name}>{pal.name}</h1>
            <div className={styles.elements}>
              {pal.elements.map((el) => (
                <Badge key={el} label={el} variant="element" element={el} />
              ))}
            </div>
          </div>
        </div>
        <button
          className={`${styles.trackButton} ${isOwned ? styles.tracked : ''}`}
          onClick={() => togglePal(pal.id)}
          type="button"
          aria-pressed={isOwned}
        >
          {isOwned ? '✓ Owned' : '+ Mark as Owned'}
        </button>
      </div>

      <p className={styles.description}>{pal.description}</p>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Partner Skill</h2>
          <p className={styles.partnerSkill}>{pal.partnerSkill}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Suitabilities</h2>
          {pal.workSuitabilities.length > 0 ? (
            <ul className={styles.workList} role="list">
              {pal.workSuitabilities.map((ws) => (
                <li key={ws.type} className={styles.workItem}>
                  <span className={styles.workName}>{formatWorkType(ws.type)}</span>
                  <span className={styles.workLevel}>Lv {ws.level}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No work suitabilities.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Drops</h2>
          {pal.drops.length > 0 ? (
            <ul className={styles.dropList} role="list">
              {pal.drops.map((drop, i) => {
                const material = getMaterialById(drop.materialId)
                return (
                  <li key={`${drop.materialId}-${i}`} className={styles.dropItem}>
                    <Link to={`/materials`} className={styles.materialLink}>
                      {material && (
                        <ItemImage
                          name={material.name}
                          imageUrl={material.imageUrl}
                          category={material.category}
                          size="sm"
                        />
                      )}
                      {material?.name ?? drop.materialId}
                    </Link>
                    <div className={styles.dropBadges}>
                      <Badge label={formatAcquisitionMethod(drop.method)} variant="method" />
                      {drop.rate && <Badge label={formatDropRate(drop.rate)} variant="neutral" />}
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className={styles.empty}>No known drops.</p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Locations</h2>
          {pal.locations.length > 0 ? (
            <ul className={styles.locationList} role="list">
              {pal.locations.map((loc) => (
                <li key={loc} className={styles.locationItem}>
                  📍 {loc}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No known locations.</p>
          )}
        </section>
      </div>
    </div>
  )
}
