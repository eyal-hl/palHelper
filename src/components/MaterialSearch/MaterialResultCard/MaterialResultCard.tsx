import type { Material } from '@/data/types'
import { Badge } from '@/components/shared/Badge/Badge'
import { ItemImage } from '@/components/shared/ItemImage/ItemImage'
import styles from './MaterialResultCard.module.css'

interface MaterialResultCardProps {
  material: Material
  sourceCount: number
  onSelect: (material: Material) => void
}

export function MaterialResultCard({ material, sourceCount, onSelect }: MaterialResultCardProps) {
  return (
    <button className={styles.card} onClick={() => onSelect(material)} type="button">
      <div className={styles.top}>
        <ItemImage
          name={material.name}
          imageUrl={material.imageUrl}
          category={material.category}
          size="md"
        />
        <Badge label={material.category.replace('_', ' ')} variant="category" />
      </div>
      <span className={styles.name}>{material.name}</span>
      <p className={styles.description}>{material.description}</p>
      <p className={styles.sourceCount}>
        {sourceCount > 0
          ? `${sourceCount} Pal${sourceCount !== 1 ? 's' : ''} can provide this`
          : 'No Pal sources known'}
      </p>
    </button>
  )
}
