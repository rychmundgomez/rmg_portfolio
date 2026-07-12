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
    base: '#050816',
    subtle: '#080b1a',
    muted: '#0a0f22',
    overlay: '#0D1224',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    // Kept in sync with tailwind.config.ts — see the comment there for
    // the contrast measurement (4.56:1, WCAG AA pass).
    tertiary: '#6B7A94',
    disabled: '#2D3748',
  },
  brand: {
    blue: '#4F7CFF',
    blueDark: '#3D63D9',
    blueLight: '#7B9CFF',
    cyan: '#00D4FF',
    cyanDark: '#00A8CC',
    cyanLight: '#4FE0FF',
    purple: '#7B61FF',
    purpleDark: '#6247D9',
    purpleLight: '#9884FF',
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
  blue: '79,124,255',
  cyan: '0,212,255',
  purple: '123,97,255',
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
