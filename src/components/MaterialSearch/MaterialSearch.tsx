import { SearchInput } from '@/components/shared/SearchInput/SearchInput'
import { EmptyState } from '@/components/shared/EmptyState/EmptyState'
import { Modal } from '@/components/shared/Modal/Modal'
import { ItemImage } from '@/components/shared/ItemImage/ItemImage'
import { Badge } from '@/components/shared/Badge/Badge'
import { MaterialResultCard } from './MaterialResultCard/MaterialResultCard'
import { PalSourceList } from './PalSourceList/PalSourceList'
import { useMaterialSearch } from '@/hooks/MaterialSearch/useMaterialSearch'
import { getPalsByMaterialId } from '@/utils/data/palHelpers'
import styles from './MaterialSearch.module.css'

export function MaterialSearch() {
  const { query, setQuery, results, selectedMaterial, selectMaterial } = useMaterialSearch()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Material Search</h1>
      <p className={styles.subtitle}>Find which Pals drop or produce a material.</p>

      <div className={styles.searchWrapper}>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search materials..."
          autoFocus
        />
      </div>

      {results.length === 0 ? (
        <EmptyState
          message="No materials found"
          hint={query ? 'Try a different search term' : undefined}
        />
      ) : (
        <ul className={styles.grid} role="list">
          {results.map((material) => (
            <li key={material.id}>
              <MaterialResultCard
                material={material}
                sourceCount={getPalsByMaterialId(material.id).length}
                onSelect={selectMaterial}
              />
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={selectedMaterial !== null}
        onClose={() => selectMaterial(null)}
        title={
          selectedMaterial && (
            <>
              <ItemImage
                name={selectedMaterial.name}
                imageUrl={selectedMaterial.imageUrl}
                category={selectedMaterial.category}
                size="md"
              />
              <div>
                <div>{selectedMaterial.name}</div>
                <Badge label={selectedMaterial.category.replace('_', ' ')} variant="category" />
              </div>
            </>
          )
        }
      >
        {selectedMaterial && (
          <div className={styles.modalBody}>
            <p className={styles.description}>{selectedMaterial.description}</p>
            <h3 className={styles.sourcesTitle}>Pal Sources</h3>
            <PalSourceList material={selectedMaterial} />
          </div>
        )}
      </Modal>
    </div>
  )
}
