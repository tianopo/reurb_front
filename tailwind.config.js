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
      backgroundImage: {
        'gradient': 'linear-gradient(270deg, #80BAEC 0%, #228BE5 100%)'
      },
      boxShadow: {
        primary: '0 4px 8px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
};
