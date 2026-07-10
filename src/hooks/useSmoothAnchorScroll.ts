import { useEffect } from 'react'
import { gsap } from '@lib/gsapConfig'
import { useReducedMotion } from './useReducedMotion'

const NAV_OFFSET = 88 // must match the scroll-margin-top set in globals.css

/**
 * Intercepts clicks on any `<a href="#id">` in the document and animates
 * the scroll with GSAP instead of relying on the browser default. This is
 * a real fix, not decoration: native anchor scrolling has no concept of
 * the fixed navbar's height, so `#about` would otherwise land with its
 * heading hidden behind the nav. `offsetY` compensates for that.
 *
 * Falls back to an instant `scrollIntoView` for reduced-motion users.
 */
export function useSmoothAnchorScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      e.preventDefault()

      if (reduced) {
        target.scrollIntoView({ block: 'start' })
        return
      }

      gsap.to(window, {
        duration: 1,
        ease: 'power3.inOut',
        scrollTo: { y: hash, offsetY: NAV_OFFSET },
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reduced])
}
