import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'
import Lightbox from '@components/gallery/Lightbox'
import { galleryCategories, galleryItems, type GalleryCategory } from '@data/gallery'
import { cn } from '@lib/utils'

const SIZE_CLASSES: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'md:col-span-2',
  square: '',
}

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter]
  )

  const closeLightbox = () => {
    setActiveIndex(null)
    // Return focus to whichever tile opened the dialog, rather than
    // dropping focus back to <body> — standard modal-dialog a11y pattern.
    lastTriggerRef.current?.focus()
  }

  return (
    <section id="gallery" className="section-y bg-bg-subtle">
      <div className="container-base">
        <SectionHeader
          eyebrow="Creative Work"
          title="Gallery"
          subtitle="Design, branding, and media work outside the code — filter by category or open any piece."
          className="mb-8"
        />

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cn(
                'text-label-md px-4 py-2 rounded-full border transition-colors duration-200',
                filter === cat
                  ? 'bg-blue/15 border-blue/40 text-blue'
                  : 'bg-surface border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 auto-rows-[160px] md:auto-rows-[190px] gap-3.5"
        >
          <AnimatePresence>
            {filtered.map((item, i) => {
              const globalIndex = galleryItems.findIndex((g) => g.id === item.id)
              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    lastTriggerRef.current = e.currentTarget
                    setActiveIndex(globalIndex)
                  }}
                  className={cn(
                    'group relative rounded-lg overflow-hidden bg-gradient-to-br from-bg-overlay to-bg-muted border border-border text-left',
                    'flex flex-col items-center justify-center gap-2 p-4 text-center',
                    'hover:border-border-hover transition-colors duration-250',
                    SIZE_CLASSES[item.size]
                  )}
                >
                  <ImageIcon
                    size={22}
                    strokeWidth={1.3}
                    aria-hidden="true"
                    className="text-text-tertiary opacity-25 group-hover:opacity-40 transition-opacity duration-250"
                  />
                  <span className="text-label-sm text-text-tertiary group-hover:text-text-secondary transition-colors duration-250">
                    {item.title}
                  </span>
                  <span className="text-label-xs text-cyan/70">{item.category}</span>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        items={galleryItems}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={setActiveIndex}
      />
    </section>
  )
}
