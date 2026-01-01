/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        serif: ['var(--font-noto-serif-jp)', 'Hiragino Mincho ProN', 'Yu Mincho', 'Meiryo', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-up-scale': 'slideUpScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'grow-y': 'growY 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pop-in': 'popIn 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        shine: 'shine 1.05s ease-out',
        'gradient': 'gradient 15s ease infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUpScale: {
          '0%': { transform: 'translateY(30px) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        growY: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        popIn: {
          '0%': { transform: 'translateY(22px) scale(0.96)', opacity: '0' },
          '60%': { transform: 'translateY(-2px) scale(1.01)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        shine: {
          '0%': { opacity: '0', 'background-position': '0% 0%' },
          '20%': { opacity: '0.8' },
          '100%': { opacity: '0', 'background-position': '200% 0%' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-noto-sans-jp), "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
            fontFeatureSettings: '"rlig" 1, "calt" 1',
            maxWidth: 'none',
            // 見出しのスタイル
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: 'inherit',
              fontWeight: '300',
              letterSpacing: '-0.025em',
              color: '#020617', // slate-950
            },
            // 段落のスタイル
            p: {
              fontFamily: 'inherit',
              fontWeight: '300',
              lineHeight: '1.75',
              color: '#334155', // slate-700
            },
            // リストのスタイル
            'ul, ol': {
              fontFamily: 'inherit',
              color: '#334155', // slate-700
            },
            li: {
              fontFamily: 'inherit',
              fontWeight: '300',
            },
            // 強調のスタイル
            strong: {
              fontFamily: 'inherit',
              fontWeight: '400',
              color: '#020617', // slate-950
            },
            // リンクのスタイル
            a: {
              fontFamily: 'inherit',
              color: '#0284c7', // primary-600
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            // 引用のスタイル
            blockquote: {
              fontFamily: 'inherit',
              borderLeftColor: '#cbd5e1', // slate-300
              color: '#475569', // slate-600
            },
            // コードのスタイル
            code: {
              fontFamily: 'inherit',
              color: '#1e293b', // slate-800
              backgroundColor: '#f1f5f9', // slate-100
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
            pre: {
              fontFamily: 'inherit',
              backgroundColor: '#020617', // slate-950
              color: '#f1f5f9', // slate-100
            },
            // 画像のスタイル
            img: {
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            // テーブルのスタイル
            table: {
              borderCollapse: 'collapse',
            },
            'thead th': {
              borderColor: '#cbd5e1', // slate-300
              backgroundColor: '#f8fafc', // slate-50
              fontWeight: '400',
            },
            'tbody td': {
              borderColor: '#cbd5e1', // slate-300
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
