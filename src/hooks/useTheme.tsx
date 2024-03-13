import { useContext } from "react";
import { ThemeContext } from "src/config/context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used in ThemeProvider");
  }
  return context;
};
