/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #1FCFBA 50%, #FFFFFF 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '1.875rem',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
    keyframes: {
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-50%)',
          'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
        },
        '50%': {
          transform: 'translateY(25%)',
          'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
        },
      },
    },
    animation: {
      bounce: 'bounce 1s infinite', // 애니메이션 등록
    },
    colors: {
      transparent: 'transparent',
      main: '#1FCFBA',
      sub: '#8DE8D7',
      sub1: '#63DDCE',
      sub2: '#D9FAF5',
      black: '#1F2425',
      blackAlter: '#263736',
      white: '#FDFDFD',
      whiteReal: '#FFFFFF',
      gray: '#4D4F4F',
      gray1: '#747677',
      gray2: '#959595',
      gray3: '#B4B4B5',
      gray4: '#DFDDDD',
      gray5: '#F2F8F6',
      kakao: '#FEE500',
      rank1: '#FFDD00',
      rank2: '#E7E6E6',
      rank3: '#FF9D00',
      pink1: '#FF6898',
      pink2: '#FF9FCA',
      blue1: '#19B4DF',
      blue2: '#00C9D8',
    },
    fontSize: {
      10: '0.625rem', // 삭제
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.125rem', // 삭제
      20: '1.25rem',
      24: '1.5rem',
      28: '1.75rem', // 삭제
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
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.font-title': {
          'font-size': '1.5rem',
          'line-height': '2.25rem',
          'letter-spacing': '0.57%',
          'font-weight': 600,
          'font-family': 'Pretendard JP',
        },
        '.font-head': {
          'font-size': '1.25rem',
          'line-height': '1.5rem',
          'letter-spacing': '0%',
          'font-weight': 600,
          'font-family': 'Pretendard JP',
        },
        '.font-subhead': {
          'font-size': '1rem',
          'line-height': '1.5rem',
          'letter-spacing': '-1%',
          'font-weight': 600,
          'font-family': 'Pretendard JP',
        },
        '.font-body': {
          'font-size': '1rem',
          'line-height': '1.25rem',
          'letter-spacing': '-1%',
          'font-weight': 500,
          'font-family': 'Pretendard JP',
        },
        '.font-label': {
          'font-size': '0.875rem',
          'line-height': '1.125rem',
          'letter-spacing': '-1.5%',
          'font-weight': 500,
          'font-family': 'Pretendard JP',
        },
        '.font-caption': {
          'font-size': '0.75rem',
          'line-height': '1rem',
          'letter-spacing': '1%',
          'font-weight': 500,
          'font-family': 'Pretendard JP',
        },
      };
      addUtilities(newUtilities);
    },
    require('tailwindcss-animate'),
  ],
};
