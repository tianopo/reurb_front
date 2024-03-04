import { colors } from "./src/config/colors";
import { measures } from "./src/config/measures";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        primaria: ["Roboto"],
        secundaria: ["Roboto"],
        terciaria: ["Roboto"],
      },
      fontWeight: {
        low: "400",
        normal: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: measures,
      borderWidth: measures,
      borderRadius: measures,
      margin: measures,
      iconSize: measures,
      lineHeight: measures,
    },
  },
  plugins: [],
};
