import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#041627',
          800: '#1a2b3c',
          900: '#020e1a',
        },
        secondary: {
          DEFAULT: '#775a19',
          hover: '#5d4201',
          dim: '#e9c176',
          fixed: '#ffdea5',
        },
        navy: {
          DEFAULT: '#041627',
          800: '#062d4a',
          900: '#020e1a',
        },
        gold: {
          DEFAULT: '#775a19',
          dark: '#5d4201',
        },
        surface: {
          DEFAULT: '#ffffff',
          2: '#edeeef',
          container: '#edeeef',
          'container-low': '#f3f4f5',
          'container-high': '#e7e8e9',
          variant: '#e1e3e4',
        },
        background: '#f8f9fa',
        'on-surface': '#191c1d',
        'on-surface-variant': '#44474c',
        outline: {
          DEFAULT: '#74777d',
          variant: '#c4c6cd',
        },
        'text-muted': '#44474c',
      },
      fontFamily: {
        headline: ['var(--font-headline)', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        cinzel: ['var(--font-headline)', 'Manrope', 'system-ui', 'sans-serif'],
        josefin: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        editorial: '0 20px 40px rgba(25,28,29,0.06)',
        'editorial-lg': '0 24px 60px -10px rgba(25,28,29,0.12)',
        navbar: '0 20px 40px rgba(25,28,29,0.04)',
      },
    },
  },
  plugins: [],
}

export default config
