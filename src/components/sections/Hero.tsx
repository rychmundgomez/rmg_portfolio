import { lazy, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { Github, Linkedin, Link2, ArrowRight, User } from 'lucide-react'
import Button from '@components/ui/Button'
import { useTypewriter } from '@hooks/useTypewriter'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { gsap } from '@lib/gsapConfig'
import { heroRoles, socialLinks, orbitTools, trustLayer } from '@data/about'

// Code-split: the three-vendor chunk (~220kB gzipped) only loads on
// desktop viewports where the scene actually renders — see the
// isDesktop/!reduced gate below. Mobile visitors never fetch it.
const HeroScene = lazy(() => import('./HeroScene'))

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const roleText = useTypewriter(heroRoles)
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const reduced = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const flare1Ref = useRef<HTMLDivElement>(null)
  const flare2Ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return

      // Parallax: the two background flares drift at different rates as
      // the hero scrolls past, tied directly to scroll position (scrub)
      // rather than time — so it tracks the scrollbar exactly, no easing lag.
      if (flare1Ref.current) {
        gsap.to(flare1Ref.current, {
          yPercent: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
      if (flare2Ref.current) {
        gsap.to(flare2Ref.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Gentle idle float on the card — slow, gentle, no mouse tracking.
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: 10,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    },
    { scope: sectionRef, dependencies: [reduced] }
  )

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen grid md:grid-cols-2 gap-12 items-center pt-32 pb-20 overflow-hidden"
    >
      {/* 3D particle field — desktop only, skipped for reduced-motion users.
          Code-split via React.lazy so this never loads on mobile. */}
      {isDesktop && !reduced && (
        <div className="absolute inset-0 z-0 opacity-70">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      {/* Radial glow flares — parallax-driven by GSAP ScrollTrigger, see useGSAP above */}
      <div
        ref={flare1Ref}
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none -top-52 -right-24 z-0"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)' }}
      />
      <div
        ref={flare2Ref}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -bottom-36 -left-12 z-0"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />

      {/* Vertical light beam — falls from the top of the hero and pours
          onto the ID card below (see .card-flare-frame on the card). */}
      <div className="hero-light-beam hidden md:block" style={{ left: '74%' }} />


      {/* Left: text content */}
      <div className="relative z-10 container-base md:pr-0 max-w-xl md:ml-auto md:mr-0">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 text-label-xs text-green bg-green/10 border border-green/20 px-3 py-1.5 rounded-full mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
          Open to opportunities
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="text-label-xs tracking-[0.2em] uppercase text-text-tertiary mb-4"
        >
          Richmond Makafui Gamor
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="font-display font-bold text-[clamp(2.75rem,4.6vw,4.75rem)] leading-[1.04] tracking-[-0.035em] mb-4"
        >
          Designing products, <span className="text-gradient-primary">experiences</span>, and
          systems that move businesses forward.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-display font-medium text-text-secondary text-base md:text-lg mb-6 min-h-[1.6em]"
        >
          {roleText}
          <span className="inline-block w-[1.5px] h-[0.95em] bg-cyan align-middle ml-0.5 animate-pulse" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="text-body-sm text-text-secondary max-w-prose-sm mb-8"
        >
          Multidisciplinary creative and technology professional helping startups, businesses,
          and digital products grow through design, data, marketing, software, and storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <Button href="#projects" variant="primary">
            Explore My Work
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
          <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer" variant="secondary">
            Download Resume
          </Button>
          <Button href="#contact" variant="ghost">
            Let's Collaborate
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="flex gap-2.5"
        >
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <Linkedin size={15} aria-hidden="true" />
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <Github size={15} aria-hidden="true" />
          </a>
          <a
            href={socialLinks.stackupNest}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="StackUp Nest"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <Link2 size={15} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-7 text-label-xs text-text-tertiary"
        >
          <span className="uppercase tracking-[0.15em]">Worked across</span>
          {trustLayer.map((item, i) => (
            <span key={item} className="flex items-center gap-2.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-text-tertiary/40" />}
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right: ID card — photo + name on the left half, role + attributes
          on the right half, with the beam pouring onto its top edge */}
      <div className="hidden md:flex relative z-10 justify-center items-center">
        <div ref={cardRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="card-flare-frame w-[440px]"
          >
          <div className="card-flare-frame__inner grid grid-cols-2 gap-5 p-6">
            {/* Left half: photo + name */}
            <div className="flex flex-col">
              {/* Replace this placeholder with:
                  <img src="/your-photo.jpg" alt="Richmond Makafui Gamor" className="w-full aspect-[4/5] rounded-xl object-cover" />
              */}
              <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-br from-[#111827] to-[#0d1120] border border-border flex items-center justify-center mb-3">
                <User size={40} className="text-text-tertiary opacity-30" strokeWidth={1.2} aria-hidden="true" />
              </div>
              <p className="text-label-sm tracking-[0.1em] uppercase text-text-primary font-semibold">
                Richmond
              </p>
              <p className="text-label-xs text-text-tertiary">Makafui Gamor</p>
            </div>

            {/* Right half: role + attributes */}
            <div className="flex flex-col">
              <p className="font-display font-semibold text-body-md text-text-primary mb-1">
                Creative Technologist
              </p>
              <div className="inline-flex items-center gap-1.5 text-label-xs text-green mb-4 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
                Available for projects
              </div>

              <ul className="space-y-2 mb-4">
                {['Software Builder', 'Data Analyst', 'Fintech Operator', 'Based in Accra, Ghana'].map(
                  (attr) => (
                    <li key={attr} className="flex items-center gap-2 text-body-xs text-text-secondary">
                      <span className="w-1 h-1 rounded-full bg-blue shrink-0" />
                      {attr}
                    </li>
                  )
                )}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border">
                {orbitTools.slice(0, 6).map((tool) => (
                  <span
                    key={tool}
                    className="w-7 h-7 rounded-md bg-white/[0.04] border border-border flex items-center justify-center text-[9px] font-semibold text-text-tertiary"
                    title={tool}
                  >
                    {tool.charAt(0)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10 animate-scroll-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-border-hover to-transparent" />
        <span className="text-label-xs text-text-tertiary tracking-widest uppercase">
          Scroll
        </span>
      </div>
    </section>
  )
}
