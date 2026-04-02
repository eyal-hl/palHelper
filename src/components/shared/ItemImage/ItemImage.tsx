import { useState } from 'react'
import type { MaterialCategory } from '@/data/types'
import styles from './ItemImage.module.css'

const CATEGORY_FALLBACK: Record<MaterialCategory, string> = {
  material: '🪨',
  food: '🍖',
  ore: '💎',
  wood: '🪵',
  fiber: '🧵',
  medicine: '💊',
  key_item: '🗝️',
  other: '📦',
}

interface ItemImageProps {
  name: string
  imageUrl?: string
  category: MaterialCategory
  size?: 'sm' | 'md' | 'lg'
}

export function ItemImage({ name, imageUrl, category, size = 'md' }: ItemImageProps) {
  const [failed, setFailed] = useState(false)

  if (imageUrl && !failed) {
    return (
      <div className={styles.wrapper} data-size={size}>
        <img src={imageUrl} alt={name} className={styles.img} onError={() => setFailed(true)} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper} data-size={size} data-fallback="true">
      <span className={styles.fallback} aria-label={name} role="img">
        {CATEGORY_FALLBACK[category] ?? '📦'}
      </span>
    </div>
  )
}
