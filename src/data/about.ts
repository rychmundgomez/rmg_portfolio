export interface Stat {
  id: string
  value: string
  label: string
}

export const aboutStats: Stat[] = [
  { id: 'fintech-years', value: '2+', label: 'Years in Fintech Operations' },
  { id: 'gm-years', value: '3', label: 'Years General Management' },
  { id: 'ventures', value: '4', label: 'Ventures Built or Founded' },
  { id: 'skills', value: '10+', label: 'Skills Across Tech & Creative' },
]

export const aboutBio: string[] = [
  "I'm a multi-disciplinary professional based in Accra, Ghana — combining data analysis, fintech operations, software development, and creative media in one career.",
  'I currently work as a Verification Officer & Data Analyst at RenMo, a fintech company providing flexible rent and payment solutions. Previously I served as Recovery Officer, managing client follow-ups, repayment negotiations, and recovery data.',
  'Alongside my corporate role I founded and run StackUp Nest — a community savings and loans circle for which I personally designed and built the entire digital infrastructure. I also built MediaCraft, a digital services hub for creative and technical work.',
  'Before fintech, I was General Manager at Cross Multimedia for three years, leading production, client delivery, and team operations in the print and media industry.',
]

export const socialLinks = {
  email: 'gomezrychmund244@gmail.com',
  linkedin: 'https://linkedin.com/in/richmond-makafui-gamor-387237203',
  github: 'https://github.com/rychmundgomez',
  stackupNest: 'https://stackupnest.pages.dev',
} as const

export const orbitTools: string[] = [
  'React',
  'Python',
  'GSAP',
  'GitHub',
  'Photoshop',
  'Data Analysis',
  'Video Editing',
  'Cloudflare',
]

export const heroPreviewWindows = [
  { id: 'dashboard', label: 'UI Dashboard' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'analytics', label: 'Analytics Dashboard' },
  { id: 'video', label: 'Video Timeline' },
] as const

export const trustLayer: string[] = [
  'Design',
  'Analytics',
  'Marketing',
  'Operations',
  'Media Production',
]

export const heroRoles: string[] = [
  'Graphic Designer.',
  'UI/UX Designer.',
  'Data Analyst.',
  'Digital Marketer.',
  'Video Editor.',
  'Music Producer.',
  'Software Builder.',
  'Creative Technologist.',
]
