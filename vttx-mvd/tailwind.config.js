/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: ['Jura', 'sans-serif'],
      },
      keyframes: {
        'fade-in-slow': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in-slow': 'fade-in-slow 2s ease-in-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite', // 👈 custom slower pulse
      },
    },
  },
  plugins: [],
}
