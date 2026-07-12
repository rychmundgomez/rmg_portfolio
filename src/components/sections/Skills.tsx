import type { ReactNode } from 'react'
import SectionHeader from '@components/ui/SectionHeader'
import { motion } from 'framer-motion'
import { skillCategories } from '@data/skills'
import { cn } from '@lib/utils'

const ICON_BG: Record<string, string> = {
  blue: 'bg-blue/12 shadow-[0_0_0_1px_rgba(79,124,255,0.2)]',
  cyan: 'bg-cyan/12 shadow-[0_0_0_1px_rgba(0,212,255,0.2)]',
  purple: 'bg-purple/12 shadow-[0_0_0_1px_rgba(123,97,255,0.2)]',
  green: 'bg-green/12 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]',
}

const ICON_COLOR: Record<string, string> = {
  blue: 'text-blue',
  cyan: 'text-cyan',
  purple: 'text-purple',
  green: 'text-green',
}

function Tile({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Skills() {
  const [dataTech, creative, business, marketing] = skillCategories

  return (
    <section id="skills" className="section-y">
      <div className="container-base">
        <SectionHeader
          eyebrow="Expertise"
          title="Skills & Capabilities"
          subtitle="A rare blend of technical, creative, and operational know-how built across multiple industries."
          className="mb-12"
        />

        {/* Bento grid — one tall featured tile, a circular stat tile, and
            supporting tiles, echoing the Huly MetaBrain layout. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[minmax(150px,auto)]">
          {/* Featured tall tile — full height on the left */}
          <Tile index={0} className="md:col-span-5 md:row-span-2">
            <div className="bento-tile bento-tile--featured h-full p-7 md:p-8 flex flex-col">
              <div
                className={cn(
                  'w-11 h-11 rounded-md flex items-center justify-center mb-6',
                  ICON_BG[dataTech.color]
                )}
              >
                <dataTech.icon size={20} className={ICON_COLOR[dataTech.color]} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-display-sm mb-2">{dataTech.title}</h3>
              <p className="text-body-sm text-text-secondary mb-6 max-w-[30ch]">
                The technical core — building, shipping, and running real software.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {dataTech.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Tile>

          {/* Creative & Media */}
          <Tile index={1} className="md:col-span-4">
            <div className="bento-tile h-full p-6 flex flex-col justify-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-md flex items-center justify-center mb-4',
                  ICON_BG[creative.color]
                )}
              >
                <creative.icon size={18} className={ICON_COLOR[creative.color]} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-body-md mb-3">{creative.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {creative.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Tile>

          {/* Circular stat tile */}
          <Tile index={2} className="md:col-span-3 flex items-center justify-center">
            <div className="bento-circle aspect-square w-full max-w-[220px] flex flex-col items-center justify-center text-center p-6">
              <span className="font-display font-bold text-display-md text-text-primary leading-none">6+</span>
              <span className="text-label-sm text-text-tertiary mt-2">disciplines,<br />one builder</span>
            </div>
          </Tile>

          {/* Business & Operations */}
          <Tile index={3} className="md:col-span-4">
            <div className="bento-tile h-full p-6 flex flex-col justify-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-md flex items-center justify-center mb-4',
                  ICON_BG[business.color]
                )}
              >
                <business.icon size={18} className={ICON_COLOR[business.color]} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-body-md mb-3">{business.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {business.tags.slice(0, 6).map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Tile>

          {/* Marketing & Deployment */}
          <Tile index={4} className="md:col-span-3">
            <div className="bento-tile h-full p-6 flex flex-col justify-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-md flex items-center justify-center mb-4',
                  ICON_BG[marketing.color]
                )}
              >
                <marketing.icon size={18} className={ICON_COLOR[marketing.color]} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-body-md mb-3">{marketing.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {marketing.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}

