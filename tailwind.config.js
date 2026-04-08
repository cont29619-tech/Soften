/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  safelist: [
    'bg-sage', 'bg-clay', 'bg-ocean', 'bg-charcoal', 'bg-sos',
    'bg-sage/20', 'bg-sage/30', 'bg-sage/40', 'bg-sage/10',
    'text-sage', 'text-clay', 'text-ocean',
    'border-sage', 'border-clay', 'border-ocean',
    'ring-sage', 'ring-clay', 'ring-ocean',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#FAF9F6',
        sage:     '#7C9A8E',
        clay:     '#C4A484',
        ocean:    '#6B8FA3',
        charcoal: '#3D3D3D',
        sos:      '#E07A6A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'sos-pulse': 'sos-pulse 2.5s ease-in-out infinite',
        'fade-up':   'fade-up 0.6s ease-out forwards',
        'fade-in':   'fade-in 0.4s ease-out forwards',
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
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
