/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables dark mode via class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // Indigo primary theme
      }
    },
  },
  plugins: [],
}
