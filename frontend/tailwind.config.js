/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#ECEBFF',
          200: '#DDD6FE',
          500: '#6320EE',
          600: '#5E17EB',
          700: '#4C10D4',
        },
        stat: {
          balance: '#5E17EB',
          income: '#0F5132',
          expense: '#721C24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
