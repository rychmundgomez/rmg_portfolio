/**
 * Design tokens — mirrors tailwind.config.ts values.
 *
 * Tailwind classes are the source of truth for CSS. This file exists for
 * contexts Tailwind can't reach: <canvas> drawing, Three.js materials,
 * inline SVG gradients, and JS-driven animation values (GSAP tweens to
 * colors, etc). Keep both files in sync when the palette changes.
 */

export const colors = {
  bg: {
    base: '#090a0c',
    subtle: '#0d0f14',
    muted: '#111520',
    overlay: '#161b28',
  },
  text: {
    primary: '#ECEFF4',
    secondary: '#8492A6',
    // Kept in sync with tailwind.config.ts — see the comment there for
    // the contrast measurement (4.56:1, WCAG AA pass).
    tertiary: '#6B7A94',
    disabled: '#2D3748',
  },
  brand: {
    blue: '#3B82F6',
    blueDark: '#2563EB',
    blueLight: '#60A5FA',
    cyan: '#06B6D4',
    cyanDark: '#0891B2',
    cyanLight: '#22D3EE',
    purple: '#8B5CF6',
    purpleDark: '#7C3AED',
    purpleLight: '#A78BFA',
    green: '#10B981',
    amber: '#F59E0B',
  },
  border: {
    DEFAULT: 'rgba(255,255,255,0.065)',
    hover: 'rgba(255,255,255,0.14)',
  },
} as const

/** RGB triplets (no `rgb()` wrapper) for use in canvas rgba() strings or Three.js Color hex math. */
export const colorsRgb = {
  blue: '59,130,246',
  cyan: '6,182,212',
  purple: '139,92,246',
  green: '16,185,129',
  amber: '245,158,11',
} as const

export const easing = {
  expoOut: [0.16, 1, 0.3, 1],
  backOut: [0.34, 1.56, 0.64, 1],
  inOutSine: [0.76, 0, 0.24, 1],
} as const

/** CSS cubic-bezier strings for use outside Framer Motion (raw CSS-in-JS, GSAP). */
export const easingCss = {
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  inOutSine: 'cubic-bezier(0.76, 0, 0.24, 1)',
} as const

export const breakpoints = {
  xs: 400,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
  '3xl': 1600,
} as const

export const layout = {
  containerMaxWidth: 1080,
  navHeight: 72,
} as const
