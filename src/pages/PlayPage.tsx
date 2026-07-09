import { Link } from 'react-router-dom'

/**
 * PlayPage — Phase 1 scaffold for the integrated game route.
 * Per spec: the game lives at /play, is linked from a featured project
 * card on the home page, and gets the full redesign in Phase 4.
 */
export default function PlayPage() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 gap-6">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="eyebrow justify-center">
          <span className="eyebrow-dot" />
          Featured Project
        </div>
        <h1 className="text-display-sm text-gradient-primary mb-3">
          Game Arrives in Phase 4
        </h1>
        <p className="text-body-sm text-text-secondary mb-6">
          This route is reserved and wired into navigation. The redesigned
          game — new visual identity, controls, and effects — gets built out
          once the core site (Phases 2–3) is in place.
        </p>
        <Link to="/" className="btn-secondary">
          ← Back to portfolio
        </Link>
      </div>
    </main>
  )
}
