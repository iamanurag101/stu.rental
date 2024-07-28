/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sr-white': '#f8f9f0',
        'sr-bright-gray': '#e6ebef',
        'sr-black': '#00050f'
      }
    },
    fontFamily: {
      body: ['Overused Grotesk'],
    },
  },
  plugins: [],
}

