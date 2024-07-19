import { colors } from "./src/config/colors";
import { measures } from "./src/config/measures";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        primary: ["Montserrat"],
      },
      fontSize: measures,
      borderWidth: measures,
      borderRadius: measures,
      iconSize: measures,
      lineHeight: {
        "pattern": '1.2'
      },
      boxShadow: {
        primary: '10px 4px 10px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
};
