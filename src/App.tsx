import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollProgress from '@components/layout/ScrollProgress'
import CursorGlow from '@components/layout/CursorGlow'
import HomePage from '@pages/HomePage'
import PlayPage from '@pages/PlayPage'
import { useSmoothAnchorScroll } from '@hooks/useSmoothAnchorScroll'

export default function App() {
  // Global — intercepts every in-app `#anchor` click regardless of which
  // route/page it lives on, so it only needs to be wired up once here.
  useSmoothAnchorScroll()

  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {/* Fixed full-bleed noise texture — sits behind all routes */}
      <div className="noise-overlay" aria-hidden="true" />
      <CursorGlow />
      <ScrollProgress />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* The game is a featured project, but gets its own focused route
            so it isn't fighting the portfolio scroll/nav chrome. */}
        <Route path="/play" element={<PlayPage />} />
      </Routes>
    </BrowserRouter>
  )
}
