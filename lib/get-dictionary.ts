import 'server-only';

const dictionaries = {
  en: () => import('../messages/en/common.json').then((module) => module.default),
  ja: () => import('../messages/ja/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.en();
};
