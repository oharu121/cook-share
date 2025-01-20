import 'server-only'
 
const dictionaries = {
  en: () => import('../app/[lang]/dictionaries/en.json').then((module) => module.default),
  ja: () => import('../app/[lang]/dictionaries/ja.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'ja') => {
    return dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.ja();
  };