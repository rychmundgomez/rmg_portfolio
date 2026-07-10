import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@lib/gsapConfig'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useReducedMotion } from '@hooks/useReducedMotion'

const SIZE = 420
const HALF = SIZE / 2

/**
 * A soft radial light that trails the cursor across the whole page.
 * Only mounts for fine-pointer devices (skips touchscreens, where there's
 * no persistent cursor) and respects prefers-reduced-motion.
 *
 * Uses gsap.quickTo rather than setting state on every pointermove —
 * quickTo pre-compiles a tween function so repeated calls are cheap and
 * don't trigger React re-renders at 60fps.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const reduced = useReducedMotion()
  const enabled = isFinePointer && !reduced

  useGSAP(
    () => {
      if (!enabled || !ref.current) return

      gsap.set(ref.current, {
        x: window.innerWidth / 2 - HALF,
        y: window.innerHeight / 2 - HALF,
      })

      const xTo = gsap.quickTo(ref.current, 'x', { duration: 0.65, ease: 'power3' })
      const yTo = gsap.quickTo(ref.current, 'y', { duration: 0.65, ease: 'power3' })

      const onMove = (e: PointerEvent) => {
        xTo(e.clientX - HALF)
        yTo(e.clientY - HALF)
      }

      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    },
    { dependencies: [enabled] }
  )

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[1]"
      style={{
        width: SIZE,
        height: SIZE,
        background: 'radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 70%)',
      }}
    />
  )
}
