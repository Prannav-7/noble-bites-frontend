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
          bg: '#FFF0F0', // Light peach background
          primary: '#8B2E2E', // Deep maroon for accents/text
          secondary: '#D97777', // Lighter red/pink for buttons
          card: '#A65D5D', // Card background
          text: '#4A1C1C', // Dark brown text
          gold: '#DAA520', // Gold accents
          light: '#FCE4E4', // Secondary light background
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Assuming a serif font for headings
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
