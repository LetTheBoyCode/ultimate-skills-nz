/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"], 
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        brand: {
          light: "#4ADE80",
          DEFAULT: "#2563EB",
          dark: "#1E40AF",
          accent: "#FBBF24",
          pop: "#F472B6",
        },
      },
    },
  },
  plugins: [],
}