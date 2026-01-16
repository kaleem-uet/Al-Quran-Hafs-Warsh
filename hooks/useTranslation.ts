import { useAtomValue } from 'jotai/react';

import { languageAtom } from '@/jotai/atoms';
import type { Language, TranslationKey } from '@/types/translation';

// Import all translation files
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import ur from '@/locales/ur.json';

const translations = { en, ar, ur };

type InterpolationParams = Record<string, string | number>;

interface UseTranslationReturn {
  t: (key: TranslationKey, params?: InterpolationParams) => string;
  tArray: <T>(key: TranslationKey) => T[];
  language: Language;
  isRTL: boolean;
}

export function useTranslation(): UseTranslationReturn {
  const language = useAtomValue(languageAtom);

  const t = (key: TranslationKey, params?: InterpolationParams): string => {
    try {
      // Split nested key path: "settings.flip_sound.label"
      const keys = key.split('.');
      let value: any = translations[language];

      // Navigate through nested object
      for (const k of keys) {
        if (value === undefined || value === null) {
          throw new Error(`Translation key not found: ${key}`);
        }
        value = value[k];
      }

      // Type check
      if (typeof value !== 'string') {
        throw new Error(`Translation value is not a string: ${key}`);
      }

      // Interpolate parameters
      if (params) {
        return Object.entries(params).reduce(
          (str, [param, val]) => str.replace(`{{${param}}}`, String(val)),
          value,
        );
      }

      return value;
    } catch (error) {
      // Error handling
      if (__DEV__) {
        console.error(`Translation error for key "${key}":`, error);
      }

      // Fallback: try English, then return key
      if (language !== 'en') {
        try {
          const keys = key.split('.');
          let fallback: any = translations.en;
          for (const k of keys) {
            fallback = fallback[k];
          }
          if (typeof fallback === 'string') {
            return fallback;
          }
        } catch {
          // Ignore fallback errors
        }
      }

      // Last resort: return the key itself
      return key;
    }
  };

  // Specialized function for array translations (e.g., tutorial slides)
  const tArray = <T>(key: TranslationKey): T[] => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];

      for (const k of keys) {
        value = value[k];
      }

      if (!Array.isArray(value)) {
        throw new Error(`Translation value is not an array: ${key}`);
      }

      return value as T[];
    } catch (error) {
      if (__DEV__) {
        console.error(`Translation array error for key "${key}":`, error);
      }
      return [];
    }
  };

  const isRTL = language === 'ar' || language === 'ur';

  return { t, tArray, language, isRTL };
}
