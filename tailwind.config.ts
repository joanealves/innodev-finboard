import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        bg: {
          light: '#F8F9FA',
          dark: '#0B0F13',
        },
        card: {
          light: '#FFFFFF',
          dark: '#161B22',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
