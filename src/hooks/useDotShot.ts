import { useEffect, useRef, useState, useCallback, type RefObject } from 'react'
import { DotShotEngine, type EngineSnapshot } from '@/game/DotShotEngine'
import { debounce } from '@lib/utils'

interface UseDotShotResult {
  canvasRef: RefObject<HTMLCanvasElement>
  containerRef: RefObject<HTMLDivElement>
  snapshot: EngineSnapshot
  start: () => void
  fire: () => void
}

const MAX_WIDTH = 420
const ASPECT = 680 / 420 // height : width

/**
 * Computes a canvas size that fits the container's available width without
 * ever exceeding it (no horizontal scroll on narrow phones), while also
 * capping height against short viewports (landscape phones, small laptops).
 */
function computeSize(containerWidth: number): { width: number; height: number } {
  let width = Math.max(240, Math.min(containerWidth, MAX_WIDTH))
  let height = width * ASPECT

  const maxHeight = window.innerHeight * 0.68
  if (height > maxHeight) {
    height = maxHeight
    width = height / ASPECT
  }

  return { width: Math.round(width), height: Math.round(height) }
}

export function useDotShot(): UseDotShotResult {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<DotShotEngine | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const pausedRef = useRef(false)

  const [snapshot, setSnapshot] = useState<EngineSnapshot>({
    score: 0,
    best: 0,
    wins: 0,
    wonThisRun: false,
    gameOver: false,
    started: false,
    bossActive: false,
    canFire: false,
  })

  /** Resizes the backing bitmap + CSS box to match the current container width, at device pixel ratio. */
  const applySize = useCallback((width: number, height: number) => {
    const canvas = canvasRef.current
    const engine = engineRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    // Assigning canvas.width/height clears the bitmap and resets the
    // transform, so re-fetch the context and re-apply the DPR scale.
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctxRef.current = ctx

    engine?.resize(width, height)
  }, [])

  // Init engine + canvas once, then react to container resizes.
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const initialWidth = container.clientWidth || MAX_WIDTH
    const { width, height } = computeSize(initialWidth)

    const engine = new DotShotEngine(width, height, setSnapshot)
    engineRef.current = engine
    applySize(width, height)

    // Push the initial (pre-start) snapshot so `best` from localStorage shows immediately.
    setSnapshot({
      score: 0,
      best: engine.best,
      wins: engine.wins,
      wonThisRun: false,
      gameOver: false,
      started: false,
      bossActive: false,
      canFire: false,
    })

    const loop = (time: number) => {
      const ctx = ctxRef.current
      if (!lastTimeRef.current) lastTimeRef.current = time
      const dt = Math.min((time - lastTimeRef.current) / 1000, 1 / 30) // clamp huge tab-switch gaps
      lastTimeRef.current = time

      if (!pausedRef.current && ctx) {
        engine.update(dt)
        engine.draw(ctx)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onVisibility = () => {
      pausedRef.current = document.hidden
      lastTimeRef.current = 0 // avoid a huge dt jump on resume
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = debounce(() => {
      if (!containerRef.current) return
      const { width: w, height: h } = computeSize(containerRef.current.clientWidth || MAX_WIDTH)
      applySize(w, h)
    }, 150)
    window.addEventListener('resize', onResize)

    // Also watch the container directly — catches layout-driven width
    // changes (e.g. sibling content reflowing) that don't fire a window
    // 'resize' event, so the canvas bitmap never drifts out of sync with
    // its own box.
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = useCallback(() => {
    engineRef.current?.start()
  }, [])

  const fire = useCallback(() => {
    engineRef.current?.fireShot()
  }, [])

  // Keyboard input — spacebar fires
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        fire()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [fire])

  return { canvasRef, containerRef, snapshot, start, fire }
}
