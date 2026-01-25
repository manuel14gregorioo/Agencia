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
        display: ['"Clash Display"', '"Satoshi"', 'system-ui', 'sans-serif'],
        sans: ['"Outfit"', '"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      colors: {
        // Noir Brutalist palette
        noir: {
          50: '#F7F7F5',
          100: '#EBEBEB',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0A0A0B',
          950: '#050505',
        },
        // Electric lime accent
        lime: {
          50: '#F7FFE0',
          100: '#EFFFB3',
          200: '#DFFF80',
          300: '#CFFF4D',
          400: '#BFFF00',
          500: '#A6E600',
          600: '#8FCC00',
          700: '#73A600',
          800: '#5C8500',
          900: '#456600',
        },
        // Warm coral for CTAs
        coral: {
          50: '#FFF5F3',
          100: '#FFE8E4',
          200: '#FFD1C9',
          300: '#FFB0A3',
          400: '#FF8A78',
          500: '#FF6B4A',
          600: '#E85A3B',
          700: '#C4472C',
          800: '#A03A24',
          900: '#7D2E1C',
        },
        // Soft cream for backgrounds
        cream: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF5ED',
          300: '#F5EDE0',
          400: '#EDE1CF',
          500: '#DFD0B8',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23262626' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'diagonal-lines': "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(191, 255, 0, 0.03) 10px, rgba(191, 255, 0, 0.03) 20px)",
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 #0A0A0B',
        'brutal-sm': '2px 2px 0 0 #0A0A0B',
        'brutal-lg': '8px 8px 0 0 #0A0A0B',
        'brutal-lime': '4px 4px 0 0 #BFFF00',
        'brutal-coral': '4px 4px 0 0 #FF6B4A',
        'glow-lime': '0 0 40px rgba(191, 255, 0, 0.3)',
        'glow-coral': '0 0 40px rgba(255, 107, 74, 0.3)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'soft': '0 4px 20px -4px rgba(0, 0, 0, 0.1)',
        'medium': '0 8px 30px -8px rgba(0, 0, 0, 0.15)',
        'strong': '0 20px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee 30s linear infinite reverse',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'text-reveal': 'textReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'border-dance': 'borderDance 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderDance: {
          '0%, 100%': { borderColor: '#BFFF00' },
          '33%': { borderColor: '#FF6B4A' },
          '66%': { borderColor: '#0A0A0B' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      borderWidth: {
        '3': '3px',
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'display': '-0.04em',
      },
    },
  },
  plugins: [],
}
