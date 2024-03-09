import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import usJson from "./tradutions/us.json";

i18n.use(initReactI18next).init({
  fallbackLng: "us",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    us: usJson,
  },
});

export default i18n;
