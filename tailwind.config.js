/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,tsx,ts,jsx}',
    './components/**/*.{js,tsx,ts,jsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#f66728',
        secondary: {
          DEFAULT: '#8669fd',
          lightest: '#e8e1ff',
          light: '#b8a7fd',
        },
      },
    },
  },
  plugins: [],
}

