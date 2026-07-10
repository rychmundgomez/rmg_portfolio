import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Play, ImageIcon } from 'lucide-react'
import type { Project, ProjectLink } from '@data/projects'
import { cn } from '@lib/utils'

type Tab = 'features' | 'challenges' | 'results'

const TABS: { id: Tab; label: string }[] = [
  { id: 'features', label: 'Features' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'results', label: 'Results' },
]

const LINK_ICON: Record<ProjectLink['kind'], typeof ExternalLink> = {
  live: ExternalLink,
  github: Github,
  demo: ExternalLink,
  internal: Play,
}

function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const Icon = LINK_ICON[link.kind]
  const classes =
    'inline-flex items-center gap-2 text-label-md font-semibold px-4 py-2 rounded-md text-blue bg-blue/10 border border-blue/25 hover:bg-blue/20 hover:border-blue/45 transition-colors duration-200'

  if (link.kind === 'internal') {
    return (
      <Link to={link.href} className={classes}>
        <Icon size={14} aria-hidden="true" />
        {link.label}
      </Link>
    )
  }

  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
      <Icon size={14} aria-hidden="true" />
      {link.label}
    </a>
  )
}

export default function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const [tab, setTab] = useState<Tab>('features')
  const imageFirst = project.imageSide === 'left'
  const activeList = project[tab]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.06 }}
      className="glass-card p-6 md:p-9 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      {/* Image column */}
      <div className={cn('order-1', imageFirst ? 'md:order-1' : 'md:order-2')}>
        <div className="aspect-video rounded-lg bg-gradient-to-br from-bg-overlay to-bg-muted border border-border flex flex-col items-center justify-center gap-2.5 text-text-tertiary p-6 text-center">
          <ImageIcon size={28} strokeWidth={1.3} className="opacity-30" aria-hidden="true" />
          <span className="text-label-sm">{project.imageBrief}</span>
        </div>
      </div>

      {/* Content column */}
      <div className={cn('order-2', imageFirst ? 'md:order-2' : 'md:order-1')}>
        <div className="text-label-xs text-cyan mb-2">{project.category}</div>
        <h3 className="font-display font-bold text-display-sm mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-body-sm text-text-secondary italic mb-4">{project.tagline}</p>
        <p className="text-body-sm text-text-secondary mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-3 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'text-label-md px-3 py-2 -mb-px border-b-2 transition-colors duration-200',
                tab === t.id
                  ? 'text-text-primary border-blue'
                  : 'text-text-tertiary border-transparent hover:text-text-secondary'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.ul
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-1.5 mb-6 min-h-[4.5rem]"
        >
          {activeList.map((item, i) => (
            <li
              key={i}
              className="text-body-xs text-text-secondary pl-4 relative leading-relaxed"
            >
              <span className="absolute left-0 top-[0.6em] w-[3px] h-[3px] rounded-full bg-cyan" />
              {item}
            </li>
          ))}
        </motion.ul>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {project.links.map((link) => (
              <ProjectLinkButton key={link.label} link={link} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
