/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070d1e',
          900: '#0b132b',
          850: '#111c3d',
          800: '#1c2541',
          700: '#2b3964',
          600: '#3a4b82',
        },
        brand: {
          primary: '#2563eb', // Blue accent
          secondary: '#3b82f6',
          cyan: '#06b6d4',
          accent: '#60a5fa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

