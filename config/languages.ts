export const languages = ['en', 'ja'] as const;
export type Language = typeof languages[number];

export const defaultLanguage = 'en';

export const languageNames = {
  en: 'English',
  ja: '日本語',
} as const;
