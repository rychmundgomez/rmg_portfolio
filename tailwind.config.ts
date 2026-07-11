import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── COLOR SYSTEM ───────────────────────────────────
      colors: {
        // Backgrounds (darkest → lightest)
        bg: {
          base:    '#090a0c',   // Huly's exact dark
          subtle:  '#0d0f14',
          muted:   '#111520',
          overlay: '#161b28',
        },
        // Surfaces
        surface: {
          DEFAULT: 'rgba(255,255,255,0.032)',
          hover:   'rgba(255,255,255,0.055)',
          active:  'rgba(255,255,255,0.08)',
        },
        // Borders
        border: {
          DEFAULT: 'rgba(255,255,255,0.065)',
          hover:   'rgba(255,255,255,0.14)',
          focus:   'rgba(59,130,246,0.45)',
        },
        // Text hierarchy
        text: {
          primary:   '#ECEFF4',
          secondary: '#8492A6',
          // Was #4A5568 (2.63:1 against bg-base — fails WCAG AA even for
          // large text). This value measures 4.56:1, passing AA for
          // normal-size text. See contrast_check.py in the repo history
          // if this ever needs re-verifying after a palette change.
          tertiary:  '#6B7A94',
          disabled:  '#2D3748',
        },
        // Brand accents
        blue:   { DEFAULT: '#3B82F6', dark: '#2563EB', light: '#60A5FA' },
        cyan:   { DEFAULT: '#06B6D4', dark: '#0891B2', light: '#22D3EE' },
        purple: { DEFAULT: '#8B5CF6', dark: '#7C3AED', light: '#A78BFA' },
        green:  { DEFAULT: '#10B981', dark: '#059669', light: '#34D399' },
        amber:  { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FCD34D' },
      },

      // ── TYPOGRAPHY ────────────────────────────────────
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // Display sizes
        'display-2xl': ['4.5rem',  { lineHeight: '1.0',  letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.038em', fontWeight: '700' }],
        'display-lg':  ['3rem',    { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-md':  ['2.5rem',  { lineHeight: '1.08', letterSpacing: '-0.03em',  fontWeight: '700' }],
        'display-sm':  ['2rem',    { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '700' }],
        // Body sizes
        'body-xl':  ['1.25rem', { lineHeight: '1.75' }],
        'body-lg':  ['1.125rem', { lineHeight: '1.75' }],
        'body-md':  ['1rem',    { lineHeight: '1.75' }],
        'body-sm':  ['0.9375rem', { lineHeight: '1.7' }],
        'body-xs':  ['0.875rem', { lineHeight: '1.65' }],
        // UI labels
        'label-lg': ['0.875rem',  { lineHeight: '1.4', fontWeight: '500' }],
        'label-md': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-sm': ['0.75rem',   { lineHeight: '1.4', fontWeight: '500' }],
        'label-xs': ['0.6875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.04em' }],
        // Eyebrow
        'eyebrow':  ['0.6875rem', { lineHeight: '1',   fontWeight: '600', letterSpacing: '0.14em', textTransform: 'uppercase' }],
      },

      // ── SPACING ───────────────────────────────────────
      spacing: {
        // 8pt grid extras
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
      },

      // ── BORDER RADIUS ────────────────────────────────
      borderRadius: {
        'xs':  '6px',
        'sm':  '8px',
        'md':  '10px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '20px',
        '3xl': '24px',
      },

      // ── TRANSITIONS & EASING ─────────────────────────
      transitionTimingFunction: {
        // Cloudstudio / premium easing
        'expo-out':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'back-out':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'inout-sine': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        '200':  '200ms',
        '350':  '350ms',
        '500':  '500ms',
        '700':  '700ms',
      },

      // ── SHADOWS ──────────────────────────────────────
      boxShadow: {
        'glow-blue':   '0 0 0 1px rgba(59,130,246,0.35), 0 4px 20px rgba(59,130,246,0.2)',
        'glow-blue-lg':'0 0 0 1px rgba(59,130,246,0.5), 0 8px 32px rgba(59,130,246,0.32)',
        'glow-cyan':   '0 0 0 1px rgba(6,182,212,0.35), 0 4px 20px rgba(6,182,212,0.2)',
        'glow-purple': '0 0 0 1px rgba(139,92,246,0.35), 0 4px 20px rgba(139,92,246,0.2)',
        'card':        '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
        'card-hover':  '0 4px 24px rgba(0,0,0,0.5)',
        'inset-border':'inset 0 0 0 1px rgba(255,255,255,0.065)',
      },

      // ── BACKGROUNDS ──────────────────────────────────
      backgroundImage: {
        // Core gradients
        'grad-primary':   'linear-gradient(110deg, #3B82F6 0%, #06B6D4 45%, #8B5CF6 100%)',
        'grad-warm':      'linear-gradient(110deg, #F59E0B 0%, #3B82F6 60%, #06B6D4 100%)',
        'grad-blue-dark': 'linear-gradient(135deg, #3B82F6, #2563EB)',
        // Noise texture (inline SVG data-uri)
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        // Card gradient border (used with mask-image trick)
        'grad-card-border': 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.1), transparent, rgba(6,182,212,0.15))',
      },

      // ── ANIMATIONS ───────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(0.75)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%':      { transform: 'translate(30px, 20px) scale(1.05)' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
        'orbit': {
          to: { transform: 'rotate(360deg)' },
        },
        'flare-sweep': {
          '0%':   { transform: 'translateX(-60%)', opacity: '0' },
          '12%':  { opacity: '1' },
          '50%':  { opacity: '1' },
          '88%':  { opacity: '0' },
          '100%': { transform: 'translateX(160%)', opacity: '0' },
        },
      },
      animation: {
        'fade-in':      'fade-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-up':      'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-dot':    'pulse-dot 2.2s ease-in-out infinite',
        'spin-slow':    'spin-slow 7s linear infinite',
        'drift':        'drift 16s ease-in-out infinite alternate',
        'scroll-bounce':'scroll-bounce 2s ease-in-out infinite',
        'orbit':         'orbit 32s linear infinite',
        'flare-sweep':  'flare-sweep 7s ease-in-out infinite',
      },

      // ── BACKDROP ─────────────────────────────────────
      backdropBlur: {
        'nav': '24px',
      },

      // ── SCREENS ──────────────────────────────────────
      screens: {
        'xs':  '400px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },

      // ── MAX WIDTHS ───────────────────────────────────
      maxWidth: {
        'container': '1080px',
        'prose-sm':  '48ch',
        'prose-md':  '56ch',
        'prose-lg':  '64ch',
      },
    },
  },
  plugins: [],
}

export default config
