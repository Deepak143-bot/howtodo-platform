/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marker: ['var(--font-marker)', 'Permanent Marker', 'cursive'],
      },
      colors: {
        teal: '#1db992',
      }
    },
  },
  plugins: [],
}
