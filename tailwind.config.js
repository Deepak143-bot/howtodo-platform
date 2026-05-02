/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marker: ['var(--font-kalam)', 'cursive'],
        serif: ['var(--font-lora)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        cream: '#f6f5ef',
        teal: '#1db992',
      }
    },
  },
  plugins: [],
}
