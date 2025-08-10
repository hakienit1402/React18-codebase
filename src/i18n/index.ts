import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    common: {
      hello: "Hello",
    },
    home: {
      title: "Home page",
    },
  },
  vi: {
    common: {
      hello: "Xin chào",
    },
    home: {
      title: "Trang chủ",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: ["common", "home"],
  defaultNS: "common",
  detection: {
    order: ["querystring", "localStorage", "navigator"],
    caches: ["localStorage"],
  },
});

export default i18n;
