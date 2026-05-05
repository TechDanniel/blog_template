/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'planet-blue': 'radial-gradient(circle at 30% 30%, #a2d2ff, #5294e2, #3b79cc)',
      },
    },
  },
  plugins: [],
}