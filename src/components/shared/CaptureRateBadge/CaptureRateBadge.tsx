import styles from './CaptureRateBadge.module.css'

interface CaptureRateBadgeProps {
  captureRate: number
}

function getDifficulty(captureRate: number): 'easy' | 'medium' | 'hard' {
  if (captureRate >= 70) return 'easy'
  if (captureRate >= 40) return 'medium'
  return 'hard'
}

function getLabel(captureRate: number): string {
  const difficulty = getDifficulty(captureRate)
  const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
  return `${difficultyLabel} (${captureRate})`
}

export function CaptureRateBadge({ captureRate }: CaptureRateBadgeProps) {
  const difficulty = getDifficulty(captureRate)
  return (
    <span className={styles.badge} data-difficulty={difficulty}>
      {getLabel(captureRate)}
    </span>
  )
}
