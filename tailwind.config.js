/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shop_light_green: '#3b9c3c',
        shop_dark_green: '#2a7c2b',
        shop_gold: '#d4af37',
        shop_gray: '#f5f5f5',
        shop_black: '#111111',
      },
    },
  },
  plugins: [
    require("autoprefixer"),
  ],
}
