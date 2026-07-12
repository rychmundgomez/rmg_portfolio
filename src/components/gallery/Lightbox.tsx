import { useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '@data/gallery'
import SmartImage from '@components/ui/SmartImage'

interface LightboxProps {
  items: GalleryItem[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const item = activeIndex !== null ? items[activeIndex] : null
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const titleId = 'lightbox-title'

  const goPrev = useCallback(() => {
    if (activeIndex === null) return
    onNavigate((activeIndex - 1 + items.length) % items.length)
  }, [activeIndex, items.length, onNavigate])

  const goNext = useCallback(() => {
    if (activeIndex === null) return
    onNavigate((activeIndex + 1) % items.length)
  }, [activeIndex, items.length, onNavigate])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    // Move focus into the dialog so keyboard/screen-reader users land
    // somewhere sensible instead of staying on the (now-hidden) trigger.
    closeBtnRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex, onClose, goPrev, goNext])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-bg-base/90 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          <motion.div
            key={item.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-2xl w-full p-8"
          >
            <div className="aspect-video rounded-lg border border-border overflow-hidden mb-5">
              <SmartImage src={item.image} alt={item.title} fallbackLabel={item.imageBrief} fallbackIconSize={32} />
            </div>
            <div className="text-label-xs text-cyan mb-1.5">{item.category}</div>
            <h3 id={titleId} className="font-display font-semibold text-body-lg">
              {item.title}
            </h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
