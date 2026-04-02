import { useBreedingCalculator } from '@/hooks/BreedingCalculator/useBreedingCalculator'
import { isSpecialCombo } from '@/utils/data/breedingHelpers'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { Badge } from '@/components/shared/Badge/Badge'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import { PalPicker } from './PalPicker/PalPicker'
import styles from './BreedingCalculator.module.css'

export function BreedingCalculator() {
  const {
    mode,
    setMode,
    parent1Id,
    parent2Id,
    desiredChildId,
    setParent1Id,
    setParent2Id,
    setDesiredChildId,
    offspring,
    parentCombos,
  } = useBreedingCalculator()

  const isSpecial =
    mode === 'forward' && parent1Id && parent2Id ? isSpecialCombo(parent1Id, parent2Id) : false

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Breeding Calculator</h1>

      <div className={styles.tabs} role="tablist">
        <button
          className={styles.tab}
          data-active={mode === 'forward'}
          role="tab"
          aria-selected={mode === 'forward'}
          onClick={() => setMode('forward')}
          type="button"
        >
          Forward
        </button>
        <button
          className={styles.tab}
          data-active={mode === 'reverse'}
          role="tab"
          aria-selected={mode === 'reverse'}
          onClick={() => setMode('reverse')}
          type="button"
        >
          Reverse
        </button>
      </div>

      {mode === 'forward' && (
        <div className={styles.forwardSection}>
          <div className={styles.parentsRow}>
            <div className={styles.pickerWrapper}>
              <p className={styles.pickerLabel}>Parent 1</p>
              <PalPicker
                value={parent1Id}
                onChange={setParent1Id}
                placeholder="Select Parent 1..."
              />
            </div>
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
            <div className={styles.pickerWrapper}>
              <p className={styles.pickerLabel}>Parent 2</p>
              <PalPicker
                value={parent2Id}
                onChange={setParent2Id}
                placeholder="Select Parent 2..."
              />
            </div>
          </div>

          {offspring ? (
            <div className={styles.resultCard}>
              <h2 className={styles.resultTitle}>Offspring</h2>
              {isSpecial && <p className={styles.specialCombo}>Special Combo!</p>}
              <div className={styles.offspringInfo}>
                <PalImage
                  name={offspring.name}
                  imageUrl={offspring.imageUrl}
                  elements={offspring.elements}
                  size="lg"
                />
                <div className={styles.offspringDetails}>
                  <span className={styles.offspringNumber}>
                    #{offspring.paldeckNumber}
                    {offspring.paldeckVariant ?? ''}
                  </span>
                  <h3 className={styles.offspringName}>{offspring.name}</h3>
                  <div className={styles.elements}>
                    {offspring.elements.map((el) => (
                      <Badge key={el} label={el} variant="element" element={el} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : parent1Id || parent2Id ? (
            <p className={styles.hint}>Select both parents to see offspring</p>
          ) : null}
        </div>
      )}

      {mode === 'reverse' && (
        <div className={styles.reverseSection}>
          <div className={styles.pickerWrapper}>
            <p className={styles.pickerLabel}>Desired Child</p>
            <PalPicker
              value={desiredChildId}
              onChange={setDesiredChildId}
              placeholder="Select desired child..."
            />
          </div>

          {desiredChildId && parentCombos.length > 0 && (
            <div className={styles.combosSection}>
              <h2 className={styles.combosTitle}>
                {parentCombos.length} combination{parentCombos.length !== 1 ? 's' : ''} found
              </h2>
              <ul className={styles.combosList} role="list">
                {parentCombos.map(({ parent1, parent2 }) => (
                  <li key={`${parent1.id}|${parent2.id}`} className={styles.comboRow}>
                    <div className={styles.comboPal}>
                      <PalImage
                        name={parent1.name}
                        imageUrl={parent1.imageUrl}
                        elements={parent1.elements}
                        size="sm"
                      />
                      <span className={styles.comboPalName}>{parent1.name}</span>
                    </div>
                    <span className={styles.comboCross} aria-hidden="true">
                      ×
                    </span>
                    <div className={styles.comboPal}>
                      <PalImage
                        name={parent2.name}
                        imageUrl={parent2.imageUrl}
                        elements={parent2.elements}
                        size="sm"
                      />
                      <span className={styles.comboPalName}>{parent2.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {desiredChildId && parentCombos.length === 0 && (
            <EmptyState
              message="No combinations found"
              hint="This Pal cannot be bred from any known pair."
            />
          )}
        </div>
      )}
    </div>
  )
}
