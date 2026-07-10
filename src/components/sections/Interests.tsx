import { motion } from 'framer-motion'
import SectionHeader from '@components/ui/SectionHeader'
import { interests } from '@data/education'

export default function Interests() {
  return (
    <section id="interests" className="section-y">
      <div className="container-base">
        <SectionHeader eyebrow="Beyond Work" title="Interests" className="mb-8" />

        <div className="flex flex-wrap gap-2.5">
          {interests.map((interest, i) => (
            <motion.span
              key={interest.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, scale: 1.03 }}
              className="inline-flex items-center gap-2 text-body-sm font-medium px-4 py-2 rounded-full bg-surface border border-border text-text-secondary hover:bg-surface-hover hover:border-border-hover hover:text-text-primary transition-colors duration-200 cursor-default"
            >
              <span aria-hidden="true">{interest.emoji}</span>
              {interest.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
