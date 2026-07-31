import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // AION brand
        navy: {
          DEFAULT: '#231A45',
          soft: '#2E2458',
          deep: '#181031',
        },
        purple: {
          DEFAULT: '#5624D0',
          bright: '#6B3AE8',
          deep: '#41199F',
        },
        lilac: {
          DEFAULT: '#EEE9F9',
          soft: '#F6F3FC',
          edge: '#DDD3F4',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(35,26,69,0.06), 0 8px 24px -12px rgba(35,26,69,0.18)',
      },
      keyframes: {
        'pulse-nudge': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(86,36,208,0.45)' },
          '50%': { boxShadow: '0 0 0 10px rgba(86,36,208,0)' },
        },
        'flip-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-nudge': 'pulse-nudge 2s ease-out infinite',
        'flip-in': 'flip-in 180ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
