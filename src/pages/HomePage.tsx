import Navbar from '@components/layout/Navbar'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Skills from '@components/sections/Skills'
import Experience from '@components/sections/Experience'
import Projects from '@components/sections/Projects'
import Gallery from '@components/sections/Gallery'

/**
 * HomePage — Phase 3 assembly.
 *
 * Still to come:
 *   Phase 4: Game redesign at /play (already linked from Projects)
 *   Phase 5: GSAP-driven motion layered on top (parallax, pinned reveals)
 *   Phase 6/7: Contact, Education, Interests, Footer, and final polish
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Gallery />
      </main>
    </>
  )
}
