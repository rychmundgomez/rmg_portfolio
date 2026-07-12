import { motion } from 'framer-motion'
import SectionHeader from '@components/ui/SectionHeader'
import GlassCard from '@components/ui/GlassCard'
import { aboutBio, aboutStats } from '@data/about'

export default function About() {
  return (
    <section id="about" className="section-y bg-bg-subtle/70 relative">
      <div className="container-base grid md:grid-cols-2 gap-16 items-start">
        <div>
          <SectionHeader
            eyebrow="About Me"
            title={
              <>
                Building at the
                <br />
                <span className="text-gradient-primary">intersection of everything</span>
              </>
            }
          />
          <div className="mt-6 space-y-4">
            {aboutBio.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-body-sm text-text-secondary"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {aboutStats.map((stat, i) => (
            <GlassCard key={stat.id} index={i} className="p-6">
              <div className="text-display-sm text-gradient-primary mb-1">{stat.value}</div>
              <div className="text-label-sm text-text-tertiary leading-snug">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
