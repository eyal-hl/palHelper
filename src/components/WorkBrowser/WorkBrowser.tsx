import type { WorkType } from '@/data/types'
import { useWorkBrowser } from '@/hooks/WorkBrowser/useWorkBrowser'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import styles from './WorkBrowser.module.css'

const WORK_ICONS: Record<WorkType, string> = {
  kindling: '🔥',
  watering: '💧',
  planting: '🌱',
  generating: '⚡',
  handiwork: '🔨',
  gathering: '🌾',
  lumbering: '🪓',
  mining: '⛏️',
  medicine: '💊',
  transporting: '📦',
  farming: '🐄',
  cooling: '❄️',
}

function formatWorkType(wt: WorkType): string {
  return wt.charAt(0).toUpperCase() + wt.slice(1)
}

const LEVEL_OPTIONS = [1, 2, 3, 4] as const

export function WorkBrowser() {
  const {
    selectedWorkType,
    setSelectedWorkType,
    minLevel,
    setMinLevel,
    filteredPals,
    allWorkTypes,
  } = useWorkBrowser()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Work Suitability Browser</h1>

      <div className={styles.workGrid}>
        {allWorkTypes.map((wt) => (
          <button
            key={wt}
            className={styles.workCard}
            data-selected={selectedWorkType === wt}
            onClick={() => setSelectedWorkType(selectedWorkType === wt ? null : wt)}
            type="button"
          >
            <span className={styles.workIcon}>{WORK_ICONS[wt]}</span>
            <span className={styles.workLabel}>{formatWorkType(wt)}</span>
          </button>
        ))}
      </div>

      {selectedWorkType && (
        <>
          <div className={styles.levelFilter}>
            <span className={styles.levelLabel}>Minimum Level:</span>
            {LEVEL_OPTIONS.map((level) => (
              <button
                key={level}
                className={styles.levelButton}
                data-active={minLevel === level}
                onClick={() => setMinLevel(level)}
                type="button"
              >
                {level}
              </button>
            ))}
          </div>

          {filteredPals.length > 0 ? (
            <div className={styles.results}>
              <p className={styles.resultCount}>
                {filteredPals.length} pal{filteredPals.length !== 1 ? 's' : ''} found
              </p>
              <div className={styles.palGrid}>
                {filteredPals.map((pal) => {
                  const ws = pal.workSuitabilities.find((w) => w.type === selectedWorkType)!
                  return (
                    <div key={pal.id} className={styles.palCard}>
                      <PalImage
                        name={pal.name}
                        imageUrl={pal.imageUrl}
                        elements={pal.elements}
                        size="md"
                      />
                      <span className={styles.palName}>{pal.name}</span>
                      <span className={styles.palLevel}>Lv {ws.level}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <EmptyState
              message="No pals found"
              hint={`No pals have ${formatWorkType(selectedWorkType)} at level ${minLevel}+`}
            />
          )}
        </>
      )}
    </div>
  )
}
