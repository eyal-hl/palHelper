import { useState, useRef, useEffect } from 'react'
import { getAllPals } from '@/utils/data/palHelpers'
import { PalImage } from '@/components/shared/PalImage/PalImage'
import { getPalById } from '@/utils/data/palHelpers'
import styles from './PalPicker.module.css'

interface PalPickerProps {
  value: string | null
  onChange: (id: string | null) => void
  placeholder?: string
}

export function PalPicker({ value, onChange, placeholder = 'Select a Pal...' }: PalPickerProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedPal = value ? getPalById(value) : undefined

  const filteredPals = getAllPals().filter((pal) =>
    pal.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(id: string): void {
    onChange(id)
    setOpen(false)
    setQuery('')
  }

  function handleClear(): void {
    onChange(null)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className={styles.container} ref={containerRef}>
      {selectedPal ? (
        <div className={styles.selected}>
          <PalImage
            name={selectedPal.name}
            imageUrl={selectedPal.imageUrl}
            elements={selectedPal.elements}
            size="sm"
          />
          <span className={styles.selectedName}>{selectedPal.name}</span>
          <button
            className={styles.clearButton}
            onClick={handleClear}
            type="button"
            aria-label="Clear selection"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          className={styles.trigger}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {placeholder}
        </button>
      )}

      {open && (
        <div className={styles.dropdown} role="listbox">
          <input
            className={styles.search}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pals..."
            autoFocus
          />
          <ul className={styles.list}>
            {filteredPals.map((pal) => (
              <li key={pal.id}>
                <button
                  className={styles.item}
                  type="button"
                  onClick={() => handleSelect(pal.id)}
                  role="option"
                  aria-selected={pal.id === value}
                >
                  <PalImage
                    name={pal.name}
                    imageUrl={pal.imageUrl}
                    elements={pal.elements}
                    size="sm"
                  />
                  <span className={styles.palName}>{pal.name}</span>
                  <span className={styles.palNumber}>#{pal.paldeckNumber}{pal.paldeckVariant ?? ''}</span>
                </button>
              </li>
            ))}
            {filteredPals.length === 0 && <li className={styles.noResults}>No pals found</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
