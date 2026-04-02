import { Link } from 'react-router-dom'
import type { Material, AcquisitionMethod } from '@/data/types'
import { Badge } from '@/components/shared/Badge/Badge'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { formatDropRate } from '@/utils/shared/formatters'
import { getPalSourcesForMaterial, type PalMaterialSource } from '@/utils/data/palHelpers'
import { usePalTrackerContext } from '@/context/PalTrackerContext'
import styles from './PalSourceList.module.css'

interface PalSourceListProps {
  material: Material
}

const METHOD_LABELS: Record<AcquisitionMethod, { label: string; icon: string }> = {
  drop: { label: 'Drops', icon: '💀' },
  farming: { label: 'Ranch / Farming', icon: '🏡' },
  butchering: { label: 'Butchering', icon: '🔪' },
}

const METHOD_ORDER: AcquisitionMethod[] = ['drop', 'farming', 'butchering']

export function PalSourceList({ material }: PalSourceListProps) {
  const { ownedPalIds } = usePalTrackerContext()
  const sources = getPalSourcesForMaterial(material.id)

  if (sources.length === 0) {
    return <p className={styles.empty}>No Pals found that provide this material.</p>
  }

  const grouped = new Map<AcquisitionMethod, PalMaterialSource[]>()
  for (const source of sources) {
    if (!grouped.has(source.method)) grouped.set(source.method, [])
    grouped.get(source.method)!.push(source)
  }

  for (const [method, entries] of grouped) {
    grouped.set(
      method,
      [...entries].sort((a, b) => {
        const aOwned = ownedPalIds.has(a.pal.id) ? 0 : 1
        const bOwned = ownedPalIds.has(b.pal.id) ? 0 : 1
        return aOwned - bOwned
      })
    )
  }

  return (
    <div className={styles.groups}>
      {METHOD_ORDER.map((method) => {
        const entries = grouped.get(method)
        if (!entries?.length) return null
        const { label, icon } = METHOD_LABELS[method]
        return (
          <section key={method} className={styles.group}>
            <h4 className={styles.groupTitle}>
              <span aria-hidden="true">{icon}</span>
              {label}
              <span className={styles.groupCount}>{entries.length}</span>
            </h4>
            <ul className={styles.list} role="list">
              {entries.map(({ pal, rate }) => (
                <li key={`${pal.id}-${method}`} className={styles.item}>
                  <Link to={`/pals/${pal.id}`} className={styles.palLink}>
                    <PalImage
                      name={pal.name}
                      imageUrl={pal.imageUrl}
                      elements={pal.elements}
                      size="sm"
                    />
                    <span className={styles.palName}>{pal.name}</span>
                    <span className={styles.palNumber}>#{pal.paldeckNumber}{pal.paldeckVariant ?? ''}</span>
                  </Link>
                  <div className={styles.badges}>
                    {pal.elements.map((el) => (
                      <Badge key={el} label={el} variant="element" element={el} />
                    ))}
                    {rate && <Badge label={formatDropRate(rate)} variant="neutral" />}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
