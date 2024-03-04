import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptbrJson from "./tradutions/ptbr.json";

i18n.use(initReactI18next).init({
  fallbackLng: "ptbr",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ptbr: ptbrJson,
  },
});

export default i18n;
