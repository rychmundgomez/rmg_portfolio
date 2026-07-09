import type { LucideIcon } from 'lucide-react'
import { Code2, Palette, Briefcase, Rocket } from 'lucide-react'

export interface SkillCategory {
  id: string
  title: string
  icon: LucideIcon
  color: 'blue' | 'cyan' | 'purple' | 'green'
  tags: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'data-tech',
    title: 'Data & Technology',
    icon: Code2,
    color: 'blue',
    tags: [
      'Data Analysis',
      'Google Apps Script',
      'Google Sheets',
      'JavaScript',
      'HTML / CSS',
      'React',
      'Python',
      'Tailwind CSS',
      'Three.js',
      'GSAP',
      'Paystack',
      'GA4',
    ],
  },
  {
    id: 'creative-media',
    title: 'Creative & Media',
    icon: Palette,
    color: 'cyan',
    tags: [
      'Adobe Photoshop',
      'Graphic Design',
      'Branding',
      'Video Editing',
      'Music Production',
      'Content Creation',
      'AutoCAD',
      'Print Processes',
      'Visual Storytelling',
    ],
  },
  {
    id: 'business-ops',
    title: 'Business & Operations',
    icon: Briefcase,
    color: 'purple',
    tags: [
      'Field Verification',
      'Financial Recovery',
      'Verification Reporting',
      'CRM',
      'Process Optimization',
      'Inventory Mgmt',
      'Information Validation',
      'Compliance',
      'Team Leadership',
      'Attention to Detail',
    ],
  },
  {
    id: 'marketing-deploy',
    title: 'Marketing & Deployment',
    icon: Rocket,
    color: 'green',
    tags: [
      'Digital Marketing',
      'Affiliate Strategy',
      'SEO',
      'Social Media',
      'Cloudflare Pages',
      'Netlify',
      'GitHub',
      'Effective Communication',
    ],
  },
]
