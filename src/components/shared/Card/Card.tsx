import type { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  onClick?: () => void
  isSelected?: boolean
  className?: string
}

export function Card({ children, onClick, isSelected, className }: CardProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${className ?? ''}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      aria-pressed={onClick && isSelected !== undefined ? isSelected : undefined}
    >
      {children}
    </Tag>
  )
}
