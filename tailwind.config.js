/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, rgba(72, 77, 84, 0.5), rgba(72, 77, 84, 1))',
      },
    },
    colors: {
      black01: '#212121',
      black02: '#464656',
      gray01: '#626273',
      gray02: '#9090A0',
      gray03: '#C6C6D0',
      white01: '#E9E9EE',
      white02: '#F5F5F9',
      white03: '#FFFFFF',
    },
    fontSize: {
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      24: '1.5rem',
      28: '1.75rem',
    },
    maxWidth: {
      DEFAULT: '430px',
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
