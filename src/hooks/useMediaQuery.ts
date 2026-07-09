import { useEffect, useState } from 'react'

/**
 * Reactive media query hook, e.g. useMediaQuery('(max-width: 768px)').
 * Used for logic that CSS alone can't express — e.g. disabling the
 * Three.js hero scene on mobile for performance.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}
