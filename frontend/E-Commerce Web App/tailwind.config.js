/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        lightBackground: '#f9fafb',
        darkBackground: '#1f2937',
      },
    },
  },
  plugins: [],
} 