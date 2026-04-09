/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  safelist: [
    'bg-sage', 'bg-clay', 'bg-ocean', 'bg-charcoal', 'bg-sos', 'bg-slate',
    'bg-sage/20', 'bg-sage/30', 'bg-sage/40', 'bg-sage/10',
    'bg-clay/10', 'bg-clay/20', 'bg-ocean/10', 'bg-ocean/8',
    'text-sage', 'text-clay', 'text-ocean', 'text-slate',
    'border-sage', 'border-clay', 'border-ocean',
    'ring-sage', 'ring-clay', 'ring-ocean',
  ],
  theme: {
    extend: {
      colors: {
        // Embodied Editorial — warm parchment palette
        bg:       '#F7F5F1',   // warm parchment
        slate:    '#EDE9E2',   // warm linen surface
        sage:     '#5A8A6E',   // botanical green (primary)
        clay:     '#B56E4F',   // terracotta (secondary accent)
        ocean:    '#2D6073',   // deep teal (deep accent)
        charcoal: '#1E2920',   // dark forest (text)
        sos:      '#C8533F',   // deeper coral for urgency
      },
      fontFamily: {
        sans:  ['"Nunito"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      animation: {
        'sos-pulse':  'sos-pulse 2.5s ease-in-out infinite',
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
        'blob-pulse': 'blob-pulse 7s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        'sos-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217, 95, 75, 0.5)' },
          '50%':      { boxShadow: '0 0 0 10px rgba(217, 95, 75, 0)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'blob-pulse': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'scale(1)' },
          '50%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', transform: 'scale(1.02)' },
        },
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
