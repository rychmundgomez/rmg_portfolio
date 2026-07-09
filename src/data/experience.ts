export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  date: string
  badge: string
  badgeColor: 'blue' | 'green' | 'purple' | 'cyan'
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'renmo-verification',
    role: 'Verification Officer',
    company: 'RenMo, Inc.',
    location: 'Adenta Municipal, Greater Accra',
    date: '2025 — Present',
    badge: 'Current',
    badgeColor: 'green',
    bullets: [
      'Conduct customer and property verifications, validating applicant information prior to service approval',
      'Perform field visits and prepare compliance reports to meet company requirements',
      'Thorough review of property documents for accuracy and regulatory compliance',
      'Collaborate with team members to streamline verification processes and improve efficiency',
    ],
  },
  {
    id: 'renmo-recovery',
    role: 'Recovery Officer & Data Analyst',
    company: 'RenMo, Inc.',
    location: 'Adenta Municipal, Greater Accra',
    date: 'Feb 2024 — 2025',
    badge: 'RenMo',
    badgeColor: 'blue',
    bullets: [
      'Recovered outstanding payments through client follow-ups, field visits, and negotiation of repayment plans',
      'Maintained accurate recovery records while upholding high customer service standards',
      'Contributed to data-driven decision-making within the recovery operations team',
    ],
  },
  {
    id: 'cross-multimedia',
    role: 'General Manager',
    company: 'Cross Multimedia',
    location: 'Hohoe Municipal, Volta Region',
    date: 'Dec 2020 — Oct 2023',
    badge: '3 yrs',
    badgeColor: 'blue',
    bullets: [
      'Managed daily production operations and coordinated client project delivery timelines',
      'Handled budgeting, resource allocation, inventory systems, and quality control',
      'Led team coordination and maintained strong customer service operations',
      'Designed magazine and print work for clients including Hohoe EP Senior High School',
    ],
  },
  {
    id: 'stackup-nest',
    role: 'Founder & Administrator — StackUp Nest',
    company: 'formerly FutureFund Group',
    location: 'Accra',
    date: 'Ongoing',
    badge: 'Founder',
    badgeColor: 'purple',
    bullets: [
      'Founded and operate a community savings and loans circle across savings, lending, and trading divisions',
      'Built the entire digital infrastructure solo — admin dashboard, member portal, and landing page',
      'Implemented email automation, PIN auth, loan reminders, MTN MoMo payments, and a liquid glass UI',
      'Deployed public site at stackupnest.pages.dev using Three.js, GSAP, and Cloudflare Pages',
    ],
  },
  {
    id: 'freelance-design',
    role: 'Freelance Graphic Designer',
    company: 'Personal & Client Work',
    location: '',
    date: 'Freelance',
    badge: 'Creative',
    badgeColor: 'cyan',
    bullets: [
      'Designed magazine work for Hohoe Evangelical Presbyterian Senior High School',
      'Personal designer for Cookie Tee (Shirley Emma Tibilla), TV3 host, for 6 months',
      'Branding and visual assets for multiple small businesses and personal brands',
    ],
  },
]
