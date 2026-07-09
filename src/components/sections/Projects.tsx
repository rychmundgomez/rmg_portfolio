import SectionHeader from '@components/ui/SectionHeader'
import ProjectShowcase from '@components/projects/ProjectShowcase'
import { projects } from '@data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section-y">
      <div className="container-base">
        <SectionHeader
          eyebrow="Portfolio"
          title="Projects"
          subtitle="Built end-to-end — from fintech infrastructure to a playable arcade game."
          className="mb-12"
        />

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
