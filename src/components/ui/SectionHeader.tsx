import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@lib/utils'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

/**
 * Consistent "Eyebrow / Title / Subtitle" block used at the top of every
 * section. Animates in once when scrolled into view.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={cn(align === 'center' && 'text-center', className)}
    >
      <div className={cn('eyebrow', align === 'center' && 'justify-center')}>
        <span className="eyebrow-dot" />
        {eyebrow}
      </div>
      <h2 className="text-display-sm md:text-display-md mb-3 tracking-tight">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            'text-body-sm text-text-secondary max-w-prose-sm',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
