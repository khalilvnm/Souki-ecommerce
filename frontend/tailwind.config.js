/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
      dropShadow: {
        'custom': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        "primary": "#dda15e",
        "second": "#b56c28",
        "third":"#6E3919"
      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fill, minmax(230px, 1fr))"
      }
    },
  },
  plugins: [],
};