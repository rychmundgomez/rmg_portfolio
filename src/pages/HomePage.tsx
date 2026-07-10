import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Skills from '@components/sections/Skills'
import Experience from '@components/sections/Experience'
import Projects from '@components/sections/Projects'
import Gallery from '@components/sections/Gallery'
import Education from '@components/sections/Education'
import Interests from '@components/sections/Interests'
import Contact from '@components/sections/Contact'
import { useDocumentTitle } from '@hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle()

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
        <Education />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
