/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,tsx,ts,jsx}',
    './components/**/*.{js,tsx,ts,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f66728',
        secondary: '#8669fd',
      },
    },
  },
  plugins: [],
}

