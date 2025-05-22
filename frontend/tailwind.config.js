/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#273043',
        accent: '#EFA00B',
        background: '#EFF6EE',
        bluefr: '#1789FC',
        redalert: '#DD0426',
      },
      fontFamily: {
        roboto: ['Roboto' ],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],

      },
    },
  },
  plugins: [],
};
