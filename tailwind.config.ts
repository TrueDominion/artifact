/**
 * tailwind.config.ts
 * Tailwind v3 configuration for artiFACT.
 * Extends with Playfair Display (serif) and Inter (sans) font families,
 * custom crimson accent, and graphite palette.
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        crimson: {
          DEFAULT: '#C41E3A',
          light: '#D94455',
          dark: '#9B1730',
        },
        graphite: {
          DEFAULT: '#2D2D2D',
          light: '#4A4A4A',
          muted: '#8A8A8A',
          border: '#E8E8E8',
        },
        linen: {
          DEFAULT: '#FAF8F5',
          warm: '#F5F3F0',
        },
        ink: '#1A1A1A',
      },
      letterSpacing: {
        widest: '0.25em',
        wider: '0.15em',
        wide: '0.08em',
        brand: '0.04em',
      },
      lineHeight: {
        reading: '1.75',
        relaxed: '1.7',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      boxShadow: {
        'nav': '0 1px 12px rgba(0,0,0,0.06)',
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.10)',
      },
      maxWidth: {
        'reading': '68ch',
        'exhibit': '900px',
      },
    },
  },
  plugins: [],
}

export default config
