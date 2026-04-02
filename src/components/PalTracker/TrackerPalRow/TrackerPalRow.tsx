import type { Pal } from '@/data/types'
import { Badge } from '@/components/shared/Badge/Badge'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { Link } from 'react-router-dom'
import styles from './TrackerPalRow.module.css'

interface TrackerPalRowProps {
  pal: Pal
  isOwned: boolean
  onToggle: (palId: string) => void
}

export function TrackerPalRow({ pal, isOwned, onToggle }: TrackerPalRowProps) {
  return (
    <li className={`${styles.row} ${isOwned ? styles.owned : ''}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isOwned}
          onChange={() => onToggle(pal.id)}
          aria-label={`Mark ${pal.name} as owned`}
        />
        <span className={styles.checkmark} aria-hidden="true">
          {isOwned ? '✓' : ''}
        </span>
        <PalImage name={pal.name} imageUrl={pal.imageUrl} elements={pal.elements} size="sm" />
        <Link
          to={`/pals/${pal.id}`}
          className={styles.palName}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.number}>#{pal.paldeckNumber}{pal.paldeckVariant ?? ''}</span>
          {pal.name}
        </Link>
        <div className={styles.elements}>
          {pal.elements.map((el) => (
            <Badge key={el} label={el} variant="element" element={el} />
          ))}
        </div>
      </label>
    </li>
  )
}
