/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 so Tailwind scans your components
  ],
  darkMode: 'class', // 👈 enables dark mode via class
  theme: {
    extend: {},
  },
  plugins: [],
}
