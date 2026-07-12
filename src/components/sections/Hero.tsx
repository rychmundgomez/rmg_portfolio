import { lazy, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { Github, Linkedin, Link2, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react'
import Button from '@components/ui/Button'
import SmartImage from '@components/ui/SmartImage'
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

function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 2h-3.2v13.6a2.9 2.9 0 1 1-2.4-2.86V9.5a6.1 6.1 0 1 0 5.6 6.08V8.9a7.6 7.6 0 0 0 4.5 1.46V7.15A4.35 4.35 0 0 1 16.5 2z" />
    </svg>
  )
}

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
      className="relative min-h-screen flex flex-col pt-32 pb-20 overflow-hidden"
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
        style={{ background: 'radial-gradient(circle, rgba(79,124,255,0.22) 0%, transparent 70%)' }}
      />
      <div
        ref={flare2Ref}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -bottom-36 -left-12 z-0"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.18) 0%, transparent 70%)' }}
      />

      {/* Vertical light beam — falls from the top of the hero, through
          open space, and pours onto the panel below. */}
      <div className="hero-light-beam" />

      {/* Text content — top, constrained width, open space around it */}
      <div className="relative z-10 container-base max-w-2xl mb-16 md:mb-24">
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
          className="text-body-md md:text-body-lg font-semibold tracking-[0.14em] uppercase text-text-primary mb-4"
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
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <Instagram size={15} aria-hidden="true" />
          </a>
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <TikTokIcon size={15} />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <Facebook size={15} aria-hidden="true" />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200"
          >
            <Twitter size={15} aria-hidden="true" />
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

      {/* Panel — big, wide, sits below the text where the beam lands.
          Stacks to a single column on mobile instead of being hidden. */}
      <div className="flex relative z-10 flex-1 items-end justify-center container-base">
        <div ref={cardRef} className="w-full max-w-[860px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="card-flare-frame w-full"
          >
            <div className="card-flare-frame__edge-glow hidden md:block" aria-hidden="true" />
            <div className="card-flare-frame__inner grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8 p-5 md:p-8">
              {/* Photo + name */}
              <div className="flex flex-col">
                <div className="w-full aspect-square md:aspect-[4/5] rounded-xl bg-gradient-to-br from-[#111827] to-[#0d1120] border border-border overflow-hidden mb-3 md:mb-4">
                  <SmartImage
                    src="/your-photo.jpg"
                    alt="Richmond Makafui Gamor"
                    className="rounded-xl"
                    fallbackIconSize={44}
                  />
                </div>
                <p className="text-label-md tracking-[0.1em] uppercase text-text-primary font-semibold">
                  Richmond
                </p>
                <p className="text-label-sm text-text-tertiary">Makafui Gamor</p>
              </div>

              {/* Role + attributes */}
              <div className="flex flex-col justify-center">
                <p className="font-display font-semibold text-xl md:text-display-sm text-text-primary mb-2">
                  Creative Technologist
                </p>
                <div className="inline-flex items-center gap-1.5 text-label-sm text-green mb-5 md:mb-6 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
                  Available for projects
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-5 md:mb-6">
                  {['Software Builder', 'Data Analyst', 'Fintech Operator', 'Based in Accra, Ghana'].map(
                    (attr) => (
                      <li key={attr} className="flex items-center gap-2 text-body-sm text-text-secondary">
                        <span className="w-1 h-1 rounded-full bg-blue shrink-0" />
                        {attr}
                      </li>
                    )
                  )}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 md:pt-5 border-t border-border">
                  {orbitTools.map((tool) => (
                    <span key={tool} className="tag-chip">
                      {tool}
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
