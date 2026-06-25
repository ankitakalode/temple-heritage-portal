/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#ffefd9',
          200: '#ffd9a8',
          300: '#ffbd6d',
          400: '#ff9a30',
          500: '#f97c0a',
          600: '#e05f00',
          700: '#b84600',
          800: '#943900',
          900: '#7a3100',
        },
        maroon: {
          50: '#fdf2f4',
          100: '#fbe8eb',
          200: '#f5d0d8',
          300: '#eca8b7',
          400: '#e07a93',
          500: '#cc4d6f',
          600: '#b83055',
          700: '#9b2246',
          800: '#821e3e',
          900: '#6e1c38',
          950: '#800020',
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
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
