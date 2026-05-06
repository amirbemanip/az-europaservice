import 'server-only';

type Dictionary = Record<string, any>;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  de: () => import('@/locales/de.json').then((module) => module.default),
  en: () => import('@/locales/en.json').then((module) => module.default),
  fa: () => import('@/locales/fa.json').then((module) => module.default),
  ar: () => import('@/locales/ar.json').then((module) => module.default),
  ru: () => import('@/locales/ru.json').then((module) => module.default),
  uk: () => import('@/locales/uk.json').then((module) => module.default),
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const deepMerge = (base: unknown, override: unknown): unknown => {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }

  if (isPlainObject(base)) {
    const result: Record<string, unknown> = { ...base };
    if (!isPlainObject(override)) {
      return result;
    }

    for (const key of Object.keys(override)) {
      result[key] = deepMerge(base[key], override[key]);
    }

    return result;
  }

  return override ?? base;
};

export const getDictionary = async (locale: string) => {
  const [defaultDictionary, localizedDictionary] = await Promise.all([
    dictionaries.de(),
    (dictionaries[locale] || dictionaries.de)(),
  ]);

  return deepMerge(defaultDictionary, localizedDictionary) as Dictionary;
};
