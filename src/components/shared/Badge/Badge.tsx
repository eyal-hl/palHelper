import type { Element } from '@/data/types'
import styles from './Badge.module.css'

type BadgeVariant = 'element' | 'method' | 'rate' | 'category' | 'neutral' | 'variant'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  element?: Element
}

export function Badge({ label, variant = 'neutral', element }: BadgeProps) {
  return (
    <span className={styles.badge} data-variant={variant} data-element={element?.toLowerCase()}>
      {label}
    </span>
  )
}
