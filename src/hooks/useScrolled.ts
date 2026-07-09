import { useEffect, useState } from 'react'

/** True once window.scrollY exceeds `threshold`. Used to toggle the solid navbar background. */
export function useScrolled(threshold = 30): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
