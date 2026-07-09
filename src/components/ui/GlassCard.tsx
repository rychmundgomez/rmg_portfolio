import type { ReactNode, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@lib/utils'

/**
 * Framer Motion's HTMLMotionProps redefines onDrag/onDragStart/onDragEnd
 * and the animation lifecycle handlers with its own signatures, which
 * conflicts with React's native HTMLAttributes typings for the same
 * names. Omitting them here keeps this component spreadable onto
 * <motion.div> without a type error, and none of them are used by callers.
 */
type SafeDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
>

interface GlassCardProps extends SafeDivProps {
  children: ReactNode
  className?: string
  /** Stagger index — multiplies into transition delay for grid reveals. */
  index?: number
  /** Disable the scroll-triggered reveal (e.g. when a parent already staggers). */
  animate?: boolean
}

/**
 * The gradient-bordered translucent card used across Skills, Experience,
 * Projects, and Education. Wraps the .glass-card CSS primitive with a
 * Framer Motion whileInView reveal so every grid gets consistent,
 * staggered entrance animation for free.
 */
export default function GlassCard({
  children,
  className,
  index = 0,
  animate = true,
  ...props
}: GlassCardProps) {
  if (!animate) {
    return (
      <div className={cn('glass-card', className)} {...(props as SafeDivProps)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className={cn('glass-card', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
