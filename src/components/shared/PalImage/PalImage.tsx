import { useState } from 'react'
import type { Element } from '@/data/types'
import styles from './PalImage.module.css'

interface PalImageProps {
  name: string
  imageUrl?: string
  elements: Element[]
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function PalImage({ name, imageUrl, elements, size = 'md' }: PalImageProps) {
  const [failed, setFailed] = useState(false)
  const primaryElement = elements[0] ?? 'Neutral'

  if (imageUrl && !failed) {
    return (
      <div className={styles.wrapper} data-size={size} data-element={primaryElement.toLowerCase()}>
        <img src={imageUrl} alt={name} className={styles.img} onError={() => setFailed(true)} />
      </div>
    )
  }

  return (
    <div
      className={styles.wrapper}
      data-size={size}
      data-element={primaryElement.toLowerCase()}
      data-fallback="true"
      aria-label={name}
      role="img"
    >
      <span className={styles.initial}>{name.charAt(0).toUpperCase()}</span>
    </div>
  )
}
