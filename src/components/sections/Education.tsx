import SectionHeader from '@components/ui/SectionHeader'
import GlassCard from '@components/ui/GlassCard'
import { education } from '@data/education'

export default function Education() {
  return (
    <section id="education" className="section-y bg-bg-subtle/70">
      <div className="container-base">
        <SectionHeader eyebrow="Learning" title="Education & Training" className="mb-12" />

        <div className="grid md:grid-cols-3 gap-3.5">
          {education.map((item, i) => {
            const Icon = item.icon
            return (
              <GlassCard key={item.id} index={i} className="p-7">
                <Icon size={22} className="text-blue mb-4" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="font-display font-semibold text-body-md mb-1">{item.school}</h3>
                <p className="text-label-sm text-cyan font-medium mb-2.5">{item.program}</p>
                <p className="text-body-xs text-text-tertiary leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
