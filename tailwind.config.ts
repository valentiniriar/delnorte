import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a5b73',
          800: '#3c4d63',
          900: '#2e3f53',
        },
        secondary: {
          DEFAULT: '#7a5a3a',
          hover: '#5c4220',
          dim: '#e8ccb0',
          fixed: '#d8b699',
        },
        navy: {
          DEFAULT: '#4a5b73',
          800: '#3c4d63',
          900: '#2e3f53',
        },
        gold: {
          DEFAULT: '#7a5a3a',
          dark: '#5c4220',
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
        'on-surface': '#333333',
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
