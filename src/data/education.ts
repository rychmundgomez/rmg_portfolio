import type { LucideIcon } from 'lucide-react'
import { GraduationCap, Zap, TrendingUp } from 'lucide-react'

export interface EducationItem {
  id: string
  icon: LucideIcon
  school: string
  program: string
  description: string
}

export const education: EducationItem[] = [
  {
    id: 'betechified',
    icon: GraduationCap,
    school: 'BeTechified',
    program: 'Full-Stack Web Development',
    description:
      'Structured coursework covering modern web development from fundamentals through advanced application building.',
  },
  {
    id: 'odin-project',
    icon: Zap,
    school: 'The Odin Project',
    program: 'Frontend & Full-Stack Track',
    description:
      'Hands-on project-based curriculum with real-world applications across HTML, CSS, JavaScript, React, and Node.js.',
  },
  {
    id: 'self-directed',
    icon: TrendingUp,
    school: 'Self-Directed Learning',
    program: 'Data Analytics · Digital Marketing · Python',
    description:
      'Ongoing independent learning in data analysis tools, digital marketing systems, and Python programming.',
  },
]

export interface Interest {
  label: string
  emoji: string
}

export const interests: Interest[] = [
  { label: 'Artificial Intelligence', emoji: '🤖' },
  { label: 'Automation', emoji: '⚙️' },
  { label: 'Investing & Finance', emoji: '📈' },
  { label: 'Ghana Stock Exchange', emoji: '🏦' },
  { label: 'Digital Entrepreneurship', emoji: '🚀' },
  { label: 'Music Production', emoji: '🎵' },
  { label: 'Content Creation', emoji: '🎬' },
  { label: 'Fitness', emoji: '💪' },
  { label: 'Motorcycles', emoji: '🏍️' },
  { label: 'Science & Technology', emoji: '🔬' },
  { label: 'History', emoji: '📚' },
  { label: 'Scalable Systems', emoji: '🌐' },
]
