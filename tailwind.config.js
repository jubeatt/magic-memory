/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.rotateY-90': {
          transform: 'rotateY(90deg)'
        },
        '.rotateY-0': {
          transform: 'rotateY(0deg)'
        }
      })
    })
  ]
}
