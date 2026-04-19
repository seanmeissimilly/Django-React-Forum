/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-cujae": "#086e54",
      },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: ["@tailwindcss/forms"],
});
