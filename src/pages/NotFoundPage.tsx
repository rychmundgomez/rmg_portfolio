import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found')

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -top-32 -right-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
      />
      <div className="glass-card max-w-md w-full p-8 text-center relative z-10">
        <div className="text-display-lg text-gradient-primary font-bold mb-2">404</div>
        <p className="text-body-sm text-text-secondary mb-6">
          This page doesn't exist — it may have moved, or the link was mistyped.
        </p>
        <Link to="/" className="btn-primary mx-auto w-fit">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
    </main>
  )
}
