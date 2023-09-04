/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      // padding: '2rem',

    },

    fontFamily: {
      Mazzard: ['Mazzard H'],
    },

    extend: {
      colors: {
        primary: '#3E7BFA',
      },

      boxShadow: {
        'button': '0 3px 15px -1px rgba(62, 123, 250, 0.8)',
        'MobileNavigationBar': '0 0 15px 1px rgba(0, 0, 0, 0.22) ',
        'simple': '0 0 15px -2px rgba(0, 0, 0, 0.22)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
