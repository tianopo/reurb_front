import { useContext } from "react";
import { ThemeContext } from "src/config/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTema deve ser utilizado dentro de ProvedorTema");
  }
  return context;
};
