import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import type { GalleryItem } from '@data/gallery'

interface LightboxProps {
  items: GalleryItem[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const item = activeIndex !== null ? items[activeIndex] : null

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
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <X size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous"
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next"
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <ChevronRight size={20} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-2xl w-full p-8"
          >
            <div className="aspect-video rounded-lg bg-gradient-to-br from-bg-overlay to-bg-muted border border-border flex flex-col items-center justify-center gap-3 text-text-tertiary mb-5">
              <ImageIcon size={32} strokeWidth={1.3} className="opacity-30" />
              <span className="text-label-sm px-6 text-center">{item.imageBrief}</span>
            </div>
            <div className="text-label-xs text-cyan mb-1.5">{item.category}</div>
            <h3 className="font-display font-semibold text-body-lg">{item.title}</h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
