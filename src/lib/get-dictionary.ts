import 'server-only';

const dictionaries: any = {
  de: () => import('@/locales/de.json').then((module) => module.default),
  en: () => import('@/locales/en.json').then((module) => module.default),
  fa: () => import('@/locales/fa.json').then((module) => module.default),
  ar: () => import('@/locales/ar.json').then((module) => module.default),
  ru: () => import('@/locales/ru.json').then((module) => module.default),
  uk: () => import('@/locales/uk.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.de;
  return dictionaryLoader();
};
