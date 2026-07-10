import { motion } from 'framer-motion'
import SectionHeader from '@components/ui/SectionHeader'
import { experience } from '@data/experience'
import { cn } from '@lib/utils'

const BADGE_STYLES: Record<string, string> = {
  blue: 'bg-blue/10 text-blue border-blue/20',
  green: 'bg-green/10 text-green border-green/20',
  purple: 'bg-purple/10 text-purple border-purple/20',
  cyan: 'bg-cyan/10 text-cyan border-cyan/20',
}

export default function Experience() {
  return (
    <section id="experience" className="section-y bg-bg-subtle/70">
      <div className="container-base">
        <SectionHeader
          eyebrow="Career"
          title="Experience"
          subtitle="Roles spanning fintech, creative management, and entrepreneurship."
          className="mb-12"
        />

        <div className="relative pl-6">
          {/* Vertical connecting line */}
          <div
            className="absolute left-0 top-1.5 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6, rgba(139,92,246,0.1))',
            }}
          />

          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cn('relative', i !== experience.length - 1 && 'pb-11')}
            >
              {/* Dot */}
              <div
                className="absolute -left-[1.865rem] top-1.5 w-2.5 h-2.5 rounded-full bg-blue"
                style={{
                  border: '2px solid #0d0f14',
                  boxShadow: '0 0 0 3px rgba(59,130,246,0.18), 0 0 12px rgba(59,130,246,0.15)',
                }}
              />

              <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                <span className="text-label-sm text-cyan font-semibold">{item.date}</span>
                <span
                  className={cn(
                    'text-label-xs font-bold px-2 py-0.5 rounded-xs border',
                    BADGE_STYLES[item.badgeColor]
                  )}
                >
                  {item.badge}
                </span>
              </div>

              <h3 className="font-display font-semibold text-body-lg mb-1">{item.role}</h3>
              <p className="text-body-xs text-text-secondary mb-3">
                {item.company}
                {item.location && ` · ${item.location}`}
              </p>

              <ul className="space-y-1.5">
                {item.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    className="text-body-xs text-text-secondary pl-4 relative leading-relaxed"
                  >
                    <span className="absolute left-0 top-[0.6em] w-[3px] h-[3px] rounded-full bg-cyan" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
