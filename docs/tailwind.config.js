/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../packages/core/src/**/*.{js,ts,jsx,tsx}', // Include core components
    '../packages/core/dist/**/*.{js,ts,jsx,tsx}' // Include built components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

