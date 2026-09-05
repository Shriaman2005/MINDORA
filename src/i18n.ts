import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import ne from "./locales/ne.json";
import as from "./locales/as.json";
import bn from "./locales/bn.json";
import brx from "./locales/brx.json";
import mni from "./locales/mni.json";

export const SUPPORTED_LANGUAGES = ["en", "hi", "ne", "as", "bn", "brx", "mni"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const LANGUAGE_STORAGE_KEY = "mindora.language";

export const indicTransLanguageCodes: Record<SupportedLanguage, string> = {
  en: "eng_Latn",
  hi: "hin_Deva",
  ne: "npi_Deva",
  as: "asm_Beng",
  bn: "ben_Beng",
  brx: "brx_Deva",
  mni: "mni_Mtei",
};

export function getSavedLanguage(): SupportedLanguage {
  const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage) ? (value as SupportedLanguage) : "en";
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi }, ne: { translation: ne }, as: { translation: as }, bn: { translation: bn }, brx: { translation: brx }, mni: { translation: mni } },
  lng: getSavedLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (language) => {
  if (SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)) localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
});

export default i18n;
