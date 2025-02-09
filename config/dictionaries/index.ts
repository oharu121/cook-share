import "server-only";
import enJson from "./en.json";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ja: () => import("./ja.json").then((module) => module.default),
};

export type DictionaryType = typeof enJson;
export const getDictionary = async (locale: "en" | "ja") => {
  return (
    dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.ja()
  );
};
