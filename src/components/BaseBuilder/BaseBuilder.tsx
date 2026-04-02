import { Link } from 'react-router-dom'
import type { WorkType } from '@/data/types'
import { useBaseBuilder } from '@/hooks/BaseBuilder/useBaseBuilder'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import styles from './BaseBuilder.module.css'

const ALL_WORK_TYPES: WorkType[] = [
  'kindling',
  'watering',
  'planting',
  'generating',
  'handiwork',
  'gathering',
  'lumbering',
  'mining',
  'medicine',
  'transporting',
  'farming',
  'cooling',
]

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

const COUNT_OPTIONS = [1, 2, 3, 4, 5] as const

export function BaseBuilder() {
  const { slots, addSlot, removeSlot, updateSlot, recommendations } = useBaseBuilder()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Base Builder</h1>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Work Slots</h2>
          <button className={styles.addButton} onClick={addSlot} type="button">
            + Add Work Slot
          </button>
        </div>

        {slots.length === 0 ? (
          <p className={styles.empty}>Add work slots to get pal recommendations for your base.</p>
        ) : (
          <ul className={styles.slotList} role="list">
            {slots.map((slot) => (
              <li key={slot.id} className={styles.slotRow}>
                <select
                  className={styles.workSelect}
                  value={slot.workType}
                  onChange={(e) =>
                    updateSlot(slot.id, { workType: e.target.value as WorkType })
                  }
                  aria-label="Work type"
                >
                  {ALL_WORK_TYPES.map((wt) => (
                    <option key={wt} value={wt}>
                      {WORK_ICONS[wt]} {formatWorkType(wt)}
                    </option>
                  ))}
                </select>

                <div className={styles.countGroup}>
                  {COUNT_OPTIONS.map((c) => (
                    <button
                      key={c}
                      className={styles.countButton}
                      data-active={slot.count === c}
                      onClick={() => updateSlot(slot.id, { count: c })}
                      type="button"
                      aria-label={`Count ${c}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => removeSlot(slot.id)}
                  type="button"
                  aria-label="Remove slot"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {slots.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recommendations</h2>
          <p className={styles.hint}>Based on your owned pals</p>

          {recommendations.size === 0 || [...recommendations.values()].every((v) => v.length === 0) ? (
            <EmptyState
              message="Track your owned Pals first"
              hint="Go to the Pal Tracker to mark which pals you own."
            />
          ) : (
            <div className={styles.recommendationsGrid}>
              {slots.map((slot) => {
                const pals = recommendations.get(slot.workType) ?? []
                return (
                  <div key={slot.id} className={styles.recCard}>
                    <h3 className={styles.recCardTitle}>
                      {WORK_ICONS[slot.workType]} {formatWorkType(slot.workType)}
                      <span className={styles.recCardCount}>(×{slot.count})</span>
                    </h3>
                    {pals.length > 0 ? (
                      <ul className={styles.recPalList} role="list">
                        {pals.map((pal) => {
                          const ws = pal.workSuitabilities.find(
                            (w) => w.type === slot.workType
                          )
                          return (
                            <li key={pal.id} className={styles.recPalRow}>
                              <PalImage
                                name={pal.name}
                                imageUrl={pal.imageUrl}
                                elements={pal.elements}
                                size="sm"
                              />
                              <span className={styles.recPalName}>{pal.name}</span>
                              {ws && (
                                <span className={styles.recPalLevel}>Lv {ws.level}</span>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    ) : (
                      <p className={styles.noPals}>
                        No owned pals with this work type.{' '}
                        <Link to="/tracker" className={styles.trackerLink}>
                          Track pals
                        </Link>
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
