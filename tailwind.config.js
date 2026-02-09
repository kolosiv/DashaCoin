/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dashacoin: {
          pink: '#ec4899',
        },
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.7)',
      },
    },
  },
  plugins: [],
}
