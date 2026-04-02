import { Link } from 'react-router-dom'
import type { Pal } from '@/data/types'
import { Badge } from '@/components/shared/Badge/Badge'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { CaptureRateBadge } from '@/components/shared/CaptureRateBadge/CaptureRateBadge'
import { usePalTrackerContext } from '@/context/PalTrackerContext'
import styles from './PalCard.module.css'

interface PalCardProps {
  pal: Pal
}

export function PalCard({ pal }: PalCardProps) {
  const { ownedPalIds } = usePalTrackerContext()
  const isOwned = ownedPalIds.has(pal.id)

  return (
    <Link to={`/pals/${pal.id}`} className={styles.card}>
      {isOwned && (
        <span className={styles.ownedBadge} aria-label="Owned" title="Owned">
          ✓
        </span>
      )}
      <div className={styles.imageRow}>
        <PalImage name={pal.name} imageUrl={pal.imageUrl} elements={pal.elements} size="lg" />
      </div>
      <div className={styles.header}>
        <span className={styles.number}>#{pal.paldeckNumber}{pal.paldeckVariant ?? ''}</span>
        <div className={styles.elements}>
          {pal.elements.map((el) => (
            <Badge key={el} label={el} variant="element" element={el} />
          ))}
        </div>
      </div>
      <h3 className={styles.name}>
        {pal.name}
        {pal.paldeckVariant && <Badge label="Variant" variant="variant" />}
      </h3>
      <p className={styles.description}>{pal.description}</p>
      <div className={styles.footer}>
        <CaptureRateBadge captureRate={pal.captureRate} />
      </div>
    </Link>
  )
}
