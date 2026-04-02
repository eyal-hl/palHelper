import styles from './EmptyState.module.css'

interface EmptyStateProps {
  message: string
  hint?: string
}

export function EmptyState({ message, hint }: EmptyStateProps) {
  return (
    <div className={styles.container} role="status">
      <p className={styles.icon} aria-hidden="true">
        🔎
      </p>
      <p className={styles.message}>{message}</p>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  )
}
