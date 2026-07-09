import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Cycles through `words`, typing and deleting each one. Returns the
 * current substring to render plus a boolean cursor-blink state isn't
 * needed since the cursor is a pure-CSS blink — this hook only owns text.
 *
 * Respects prefers-reduced-motion by freezing on the first word.
 */
export function useTypewriter(words: string[], typeSpeed = 75, deleteSpeed = 40, holdMs = 1800): string {
  const reduced = useReducedMotion()
  const [text, setText] = useState(reduced ? words[0] ?? '' : '')

  useEffect(() => {
    if (reduced || words.length === 0) return

    let wordIndex = 0
    let charIndex = 0
    let deleting = false
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = words[wordIndex]

      if (!deleting) {
        charIndex++
        setText(current.slice(0, charIndex))
        if (charIndex === current.length) {
          deleting = true
          timeout = setTimeout(tick, holdMs)
          return
        }
      } else {
        charIndex--
        setText(current.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
        }
      }

      timeout = setTimeout(tick, deleting ? deleteSpeed : typeSpeed)
    }

    timeout = setTimeout(tick, typeSpeed)
    return () => clearTimeout(timeout)
    // `words` is expected to be a stable, module-level array reference
    // (e.g. imported content data), so depending on it directly is safe
    // and avoids restarting the animation on every render.
  }, [reduced, words, typeSpeed, deleteSpeed, holdMs])

  return text
}
