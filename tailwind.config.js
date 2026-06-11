/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#121212',
        'secondary-bg': '#1A1A1A',
        'card-bg': '#222222',
        'border-color': '#2A2A2A',
        'primary-accent': '#FF7A00',
        'hover-accent': '#FF9500',
        'primary-text': '#FFFFFF',
        'secondary-text': '#B5B5B5',
      },
      borderRadius: {
        'xl': '16px',
      },
    },
  },
  plugins: [],
}