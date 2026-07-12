export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'github' | 'demo' | 'internal'
}

export interface Project {
  id: string
  category: string
  title: string
  tagline: string
  description: string
  /** Recommended image: what to shoot/source and at what aspect ratio, for when real images are added. */
  imageBrief: string
  /** Path in /public once the real image is added, e.g. /images/projects/stackup-nest.jpg */
  image?: string
  techStack: string[]
  features: string[]
  challenges: string[]
  results: string[]
  links: ProjectLink[]
  /** Layout hint for the alternating showcase — which side the image column sits on. */
  imageSide: 'left' | 'right'
}

export const projects: Project[] = [
  {
    id: 'stackup-nest',
    image: '/images/projects/stackup-nest.jpg',
    category: 'Fintech Platform',
    title: 'StackUp Nest',
    tagline: 'A full savings & loans platform, built and run solo.',
    description:
      'A community savings and loans circle operating across three divisions — savings, lending, and trading — with a member portal, admin dashboard, and public marketing site. I designed, built, and still maintain the entire digital infrastructure end to end.',
    imageBrief: 'Dashboard UI mockup on a laptop, 16:10, dark fintech aesthetic',
    techStack: [
      'Google Apps Script',
      'Google Sheets',
      'Three.js',
      'GSAP',
      'MTN MoMo API',
      'Cloudflare Pages',
    ],
    features: [
      'Member portal with savings targets, loan status, and transaction history',
      'Admin dashboard with per-admin PIN authentication and activity logging',
      'Automated email receipts, loan reminders, and onboarding via Google Forms',
      'MTN Mobile Money integration for real-time contribution tracking',
      'Liquid-glass UI redesign with full iOS standalone-mode support',
    ],
    challenges: [
      'Google Sheets as a production database at member scale — solved with careful ARRAYFORMULA/SUMPRODUCT structuring instead of a traditional DB',
      'Securing hardcoded MoMo API credentials — migrated to Script Properties with SHA-256 hashed admin PINs',
      'Cross-origin PWA service worker conflicts on iOS — diagnosed and resolved the scope mismatch',
    ],
    results: [
      'Full production security audit completed and shipped',
      'Zero-downtime migration from FutureFund Group branding to StackUp Nest',
      'Public site live at stackupnest.pages.dev',
    ],
    links: [{ label: 'Visit site', href: 'https://stackupnest.pages.dev', kind: 'live' }],
    imageSide: 'right',
  },
  {
    id: 'loan-agreement-generator',
    image: '/images/projects/loan-agreement-generator.jpg',
    category: 'Legal Tech',
    title: 'Loan Agreement Generator',
    tagline: 'Ghana-context legal documents, generated in seconds.',
    description:
      'A focused web app for generating legally-formatted loan agreements with Ghanaian context built in from the ground up — GHS currency formatting and Ghana Card ID fields — exporting straight to PDF or DOCX.',
    imageBrief: 'Form UI + generated PDF document side-by-side mockup, 4:3',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare Pages'],
    features: [
      'Dynamic form with live document preview',
      'Ghana Card ID and GHS currency fields built into the schema',
      'One-click export to both PDF and DOCX formats',
    ],
    challenges: [
      'Generating clean DOCX output from web form data without a heavy server-side dependency',
      'Keeping legal formatting consistent across PDF and DOCX exports from a single source of truth',
    ],
    results: [
      'Deployed and usable end-to-end on Cloudflare Pages',
      'Reduced agreement drafting from a manual template edit to a guided form',
    ],
    links: [{ label: 'Visit site', href: 'https://loan-agreement-generator.pages.dev/', kind: 'live' }],
    imageSide: 'left',
  },
  {
    id: 'ghana-data-storefront',
    image: '/images/projects/ghana-data-storefront.jpg',
    category: 'E-Commerce',
    title: 'Ghana Mobile Data Storefront',
    tagline: 'Buy data bundles without creating an account.',
    description:
      'A no-login storefront for purchasing mobile data bundles across Ghana\'s three major networks — MTN, Telecel, and AirtelTigo — with Paystack checkout and full funnel tracking via GA4.',
    imageBrief: 'Mobile-first storefront screens, phone mockup, 9:16',
    techStack: ['Paystack', 'GA4', 'JavaScript'],
    features: [
      'No-login checkout — phone number and network selection only',
      'Real-time bundle pricing across MTN, Telecel, and AirtelTigo',
      'Full GA4 event tracking across the purchase funnel',
    ],
    challenges: [
      'Minimizing checkout friction while still capturing enough data for delivery and support',
      'Handling three different network pricing structures in one unified UI',
    ],
    results: [
      'Live storefront with a working Paystack payment flow',
      'Funnel visibility into where users drop off before purchase',
    ],
    links: [{ label: 'View project', href: '#', kind: 'demo' }],
    imageSide: 'right',
  },
  {
    id: 'mediacraft',
    image: '/images/projects/mediacraft.jpg',
    category: 'Digital Hub · In Development',
    title: 'MediaCraft',
    tagline: 'Build. Brand. Engage.',
    description:
      'A digital services hub connecting clients with specialists across programming, design, music production, and digital marketing — built to package my own multidisciplinary skill set into a client-facing product.',
    imageBrief: 'Brand identity board — logo, color palette, service icons, 16:9',
    techStack: ['React', 'In Development'],
    features: [
      'Service marketplace connecting clients with vetted specialists',
      'Category-based browsing: programming, design, music, marketing',
    ],
    challenges: [
      'Scoping a multi-service platform without overbuilding before validating demand',
    ],
    results: ['Brand identity and service structure defined; build in progress'],
    links: [],
    imageSide: 'left',
  },
  {
    id: 'dot-shot',
    image: '/images/projects/dot-shot.jpg',
    category: 'Playable · Featured',
    title: 'Dot Shot',
    tagline: 'A small arcade game, built into this site.',
    description:
      'An arcade-style game built as a playable feature of this portfolio rather than a separate demo link — shoot dots into a spinning target, dodge your own pins, and chase a high score without ever leaving the site.',
    imageBrief: 'In-game screenshot, bold color-blocked arcade UI, 16:9',
    techStack: ['JavaScript', 'Canvas API'],
    features: [
      'Fully playable inside the portfolio at /play',
      'Score tracking and progressive difficulty',
      'Custom visual identity distinct from the rest of the site',
    ],
    challenges: [
      'Keeping game input handling isolated from the site\'s own scroll and routing behavior',
    ],
    results: ['Playable end to end, reachable directly from the Projects section'],
    links: [{ label: 'Play now', href: '/play', kind: 'internal' }],
    imageSide: 'right',
  },
]
