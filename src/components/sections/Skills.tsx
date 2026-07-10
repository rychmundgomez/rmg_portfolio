import SectionHeader from '@components/ui/SectionHeader'
import GlassCard from '@components/ui/GlassCard'
import { skillCategories } from '@data/skills'
import { cn } from '@lib/utils'

const ICON_BG: Record<string, string> = {
  blue: 'bg-blue/12 shadow-[0_0_0_1px_rgba(59,130,246,0.2)]',
  cyan: 'bg-cyan/12 shadow-[0_0_0_1px_rgba(6,182,212,0.2)]',
  purple: 'bg-purple/12 shadow-[0_0_0_1px_rgba(139,92,246,0.2)]',
  green: 'bg-green/12 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]',
}

const ICON_COLOR: Record<string, string> = {
  blue: 'text-blue',
  cyan: 'text-cyan',
  purple: 'text-purple',
  green: 'text-green',
}

export default function Skills() {
  return (
    <section id="skills" className="section-y">
      <div className="container-base">
        <SectionHeader
          eyebrow="Expertise"
          title="Skills & Capabilities"
          subtitle="A rare blend of technical, creative, and operational know-how built across multiple industries."
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 gap-3.5">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <GlassCard key={cat.id} index={i} className="p-8">
                <div
                  className={cn(
                    'w-10 h-10 rounded-md flex items-center justify-center mb-5',
                    ICON_BG[cat.color]
                  )}
                >
                  <Icon size={18} className={ICON_COLOR[cat.color]} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-body-md mb-3.5">{cat.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
