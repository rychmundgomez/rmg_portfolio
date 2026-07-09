import { useScrollProgress } from '@hooks/useScrollProgress'

/**
 * Thin gradient progress bar fixed to the top of the viewport.
 * Reads scroll position via useScrollProgress (rAF-throttled).
 */
export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 h-[1.5px] z-[300] bg-grad-primary"
      style={{
        width: `${progress}%`,
        boxShadow: '0 0 8px rgba(6,182,212,0.6)',
        transition: 'width 100ms linear',
      }}
      aria-hidden="true"
    />
  )
}
