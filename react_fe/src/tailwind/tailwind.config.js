const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      body: ['"Courier New"', 'Courier', 'monospace']
    },
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          '1': '#303030',
          '2': '#424242',
          '3': '#555555',
        },
        red: {
          ...colors.red,
          default: 'red',
        }
      },
      opacity: {
        '80': '0.8'
      }
    },
  },
  variants: {
    textDecoration: ['responsive', 'hover', 'focus', 'focus-visible', 'active'],
  },
  plugins: [],
}
