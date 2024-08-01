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
        'sr-bright-gray': '#bcbfc2',
        'sr-black': '#00050f',
        'sr-green': '#d6ffdf',
        'sr-text-green': '#4ec869'
      }
    },
    fontFamily: {
      body: ['Overused Grotesk'],
    },
  },
  plugins: [],
}

