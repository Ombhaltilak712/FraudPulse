/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Cyan electric
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        cyber: {
          bg: '#070B14',
          card: '#0C1322',
          cardBorder: '#1A253C',
          hover: '#131D33',
          accent: '#00F0FF',
          accentGlow: 'rgba(0, 240, 255, 0.15)',
        },
      },
      boxShadow: {
        'cyber-sm': '0 0 15px rgba(6, 182, 212, 0.1)',
        'cyber-glow': '0 0 25px rgba(6, 182, 212, 0.25)',
        'cyber-danger': '0 0 25px rgba(239, 68, 68, 0.25)',
        'cyber-card': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
