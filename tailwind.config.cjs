/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
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
});




