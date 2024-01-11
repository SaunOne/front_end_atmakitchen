/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize:{
      nav: '22px',
      titlebudaya: '22px',
      
    },
    extend: {
      colors: {
        'nav': '#900C3F',
        'brigth-nav': '#C70039',
        'footer-left':'#F94C10',
        'footer-right':'#900C3F',
      },
    },
  },
  plugins: [],
}

