/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
=======
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




>>>>>>> 3c7be9f2a806f2f2293bedaa1bf26a99e2106597
