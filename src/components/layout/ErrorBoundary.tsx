import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Top-level error boundary. React error boundaries must be class
 * components — there is no hook equivalent for catching render errors
 * from descendants (as of React 18). Without this, any uncaught render
 * error anywhere in the tree unmounts the entire app to a blank screen.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In a real deployment this is where you'd forward to an error-tracking
    // service (Sentry, etc). Logging to console keeps this dependency-free.
    console.error('Uncaught render error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-bg-base">
        <div className="glass-card max-w-md w-full p-8 text-center">
          <div className="eyebrow justify-center">
            <span className="eyebrow-dot" />
            Something went wrong
          </div>
          <h1 className="text-display-sm text-gradient-primary mb-3">
            This part broke
          </h1>
          <p className="text-body-sm text-text-secondary mb-6">
            An unexpected error occurred while rendering this page. Reloading
            usually fixes it.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary mx-auto">
            <RefreshCw size={15} aria-hidden="true" />
            Reload page
          </button>
        </div>
      </main>
    )
  }
}
