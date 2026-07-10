import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react'
import { useDotShot } from '@hooks/useDotShot'

export default function PlayPage() {
  const { canvasRef, containerRef, snapshot, start, fire } = useDotShot()
  const { score, best, gameOver, started, bossActive, canFire } = snapshot

  return (
    <main id="main-content" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background flares — consistent with the rest of the site */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-40 -left-24 z-0"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -bottom-32 -right-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
      />

      <Link
        to="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-label-md text-text-secondary hover:text-text-primary transition-colors duration-200"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Portfolio
      </Link>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-label-xs text-cyan mb-1 tracking-widest uppercase">Featured Project · Playable</div>
        <h1 className="font-display font-bold text-display-sm text-gradient-primary mb-6">
          Dot Shot
        </h1>

        {/* HUD — the live region here is the accessible score readout;
            the canvas itself is visual/pointer-only (see aria-hidden below). */}
        <div className="flex items-center gap-6 mb-4 text-body-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-text-tertiary text-label-sm">Score</span>
            <span
              className="font-display font-semibold tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              {score}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-amber" aria-hidden="true" />
            <span className="font-display font-semibold tabular-nums">{best}</span>
          </div>
          <AnimatePresence>
            {bossActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="text-label-xs font-bold text-purple bg-purple/12 border border-purple/30 px-2.5 py-1 rounded-full tracking-wide uppercase"
              >
                Boss Wave
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Game surface. The canvas is a real-time visual/pointer game with
            no meaningful text representation, so it's hidden from assistive
            tech (aria-hidden + tabIndex=-1) rather than left as an
            unlabeled, unusable focus stop. Everyone gets the same controls
            though: the Start/Fire/Play Again buttons and the live score
            readout above are all real, focusable, screen-reader-visible
            elements — spacebar-to-fire also works regardless of focus. */}
        <div ref={containerRef} className="relative glass-card p-2 rounded-2xl w-full max-w-[420px] mx-auto">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            tabIndex={-1}
            onPointerDown={() => (started && !gameOver ? fire() : undefined)}
            className="rounded-xl block w-full h-auto cursor-crosshair touch-none"
            style={{ background: 'radial-gradient(circle at 50% 30%, #111520 0%, #090a0c 75%)' }}
          />

          {/* Start overlay */}
          <AnimatePresence>
            {!started && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-2 rounded-xl bg-bg-base/85 backdrop-blur-sm flex flex-col items-center justify-center text-center px-8"
              >
                <p className="text-body-sm text-text-secondary mb-1 max-w-[26ch]">
                  Shoot dots into the spinning hub. Land too close to your own pin and it's over.
                </p>
                <p className="text-label-sm text-text-tertiary mb-6">
                  Every 6th pin is golden · every 8th triggers a Boss Wave
                </p>
                <button onClick={start} className="btn-primary">
                  <Play size={15} aria-hidden="true" />
                  Start Game
                </button>
                <p className="text-label-xs text-text-tertiary mt-5">
                  Tap the board or press Space to fire
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game over overlay */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-2 rounded-xl bg-bg-base/85 backdrop-blur-sm flex flex-col items-center justify-center text-center px-8"
              >
                <div className="text-label-xs text-text-tertiary uppercase tracking-widest mb-2">
                  Game Over
                </div>
                <div className="font-display font-bold text-display-sm text-gradient-primary mb-1">
                  {score}
                </div>
                {score >= best && score > 0 && (
                  <div className="text-label-sm text-amber mb-4">New best score</div>
                )}
                {!(score >= best && score > 0) && <div className="mb-4" />}
                <button onClick={start} className="btn-primary">
                  <RotateCcw size={15} aria-hidden="true" />
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fire button — mobile-friendly, mirrors spacebar */}
        {started && !gameOver && (
          <button
            onClick={fire}
            disabled={!canFire}
            className="btn-secondary mt-5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Fire
          </button>
        )}
      </div>
    </main>
  )
}
