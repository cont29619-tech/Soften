/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  safelist: [
    'bg-sage', 'bg-clay', 'bg-ocean', 'bg-charcoal', 'bg-sos', 'bg-sand',
    'bg-sage/20', 'bg-sage/30', 'bg-sage/40', 'bg-sage/10',
    'text-sage', 'text-clay', 'text-ocean', 'text-sand',
    'border-sage', 'border-clay', 'border-ocean', 'border-sand',
    'ring-sage', 'ring-clay', 'ring-ocean', 'ring-sand',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#FDFCF9',
        sand:     '#F5F3ED',
        sage:     '#7C9A8E',
        clay:     '#C4A484',
        ocean:    '#6B8FA3',
        charcoal: '#3D3D3D',
        sos:      '#E07A6A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'sos-pulse': 'sos-pulse 2.5s ease-in-out infinite',
        'fade-up':   'fade-up 0.6s ease-out forwards',
        'fade-in':   'fade-in 0.4s ease-out forwards',
        'blob-pulse': 'blob-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'sos-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(224, 122, 106, 0.5)' },
          '50%':      { boxShadow: '0 0 0 10px rgba(224, 122, 106, 0)' },
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
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
