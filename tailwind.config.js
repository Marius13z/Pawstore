/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#422C4F',
        'logo': '#000072',
        'secondary': '#EBA25D',
        'third': '#967F92',
        'blur-primary': '#61E3F1',
        'blur-secondary': '#FFC065',
        'fourth': '#475A96',
        'fifth': '#4086F5'
      },
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))' 
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide")
  ],
}
