/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1EA',
        'mh-black': '#0A0A0A',
        graphite: '#1C1C1E',
        stone: '#8E8B82',
        'soft-gray': '#C7C4BD',
        accent: {
          DEFAULT: '#5E1A26',
          light: '#7A2A38',
          dark: '#3F1019',
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", 'serif'],
        body: ["'Inter'", 'sans-serif'],
        sans: ["'Inter'", 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        'editorial': '0.2em',
        'wide-sm': '0.1em',
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
