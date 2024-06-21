/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["Poppins", "sans-serif"],
      },
      colors: {
        'primary': {
          'main': '#5C2FC2',
          'light': '#AD97E0',
          'surface': '#DED5F3'
        }
      }
    },
  },
  plugins: [],
}

