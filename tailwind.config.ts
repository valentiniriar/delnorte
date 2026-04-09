import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#041627',
          800: '#062d4a',
          900: '#020e1a',
        },
        gold: {
          DEFAULT: '#C4A35A',
          dark: '#9c7c32',
        },
        surface: {
          DEFAULT: '#F8F9FA',
          2: '#EEF0F2',
        },
        'text-muted': '#6B7280',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        josefin: ['var(--font-josefin)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
