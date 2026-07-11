import { lazy, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { Github, Linkedin, Link2, Mail, Play, User } from 'lucide-react'
import Button from '@components/ui/Button'
import { useTypewriter } from '@hooks/useTypewriter'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { gsap } from '@lib/gsapConfig'
import { heroRoles, socialLinks } from '@data/about'

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
  const photoRingRef = useRef<HTMLDivElement>(null)

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

      // Floating idle motion on the photo ring — a slow, continuous
      // vertical drift independent of scroll.
      if (photoRingRef.current) {
        gsap.to(photoRingRef.current, {
          y: 14,
          duration: 2.6,
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

      {/* Vertical light beam — the actual Huly hero effect. Terminates
          near the photo ring so it also gives the hero a focal point. */}
      <div className="hero-light-beam hidden md:block" style={{ left: '72%' }} />

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

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-display-lg md:text-display-xl mb-4"
        >
          <span className="text-gradient-primary">Richmond</span>
          <br />
          Makafui Gamor
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
          Combining data, design, software, and operations to build things that actually
          work — from fintech platforms to creative digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <Button href="#projects" variant="primary">
            <Play size={14} aria-hidden="true" />
            View Projects
          </Button>
          <Button href="#contact" variant="secondary">
            Contact Me
          </Button>
          <Button href={`mailto:${socialLinks.email}`} variant="secondary">
            <Mail size={14} aria-hidden="true" />
            Email
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
      </div>

      {/* Right: photo ring (desktop only) */}
      <div ref={photoRingRef} className="hidden md:flex relative z-10 justify-start pl-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="relative w-[280px] h-[280px]"
        >
          <div
            className="absolute -inset-0.5 rounded-full animate-spin-slow"
            style={{
              background:
                'conic-gradient(from 0deg, #3B82F6, #06B6D4, #8B5CF6, #3B82F6)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 2.5px), black 100%)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), black 100%)',
            }}
          />
          {/* Replace this placeholder with:
              <img src="/your-photo.jpg" alt="Richmond Makafui Gamor" className="w-[274px] h-[274px] rounded-full object-cover relative z-[1]" />
          */}
          <div className="relative z-[1] w-[274px] h-[274px] rounded-full bg-gradient-to-br from-[#111827] to-[#0d1120] flex flex-col items-center justify-center gap-2 m-auto mt-[3px] ml-[3px]">
            <User size={48} className="text-text-tertiary opacity-25" strokeWidth={1.2} aria-hidden="true" />
            <span className="text-label-sm text-text-tertiary">Add your photo</span>
          </div>
        </motion.div>
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
