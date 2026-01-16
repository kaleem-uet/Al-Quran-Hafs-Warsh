export type Language = 'en' | 'ar' | 'ur';

// Utility type to extract nested paths from translation object
type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ? T[Key] extends ArrayLike<any>
      ? Key
      : Key | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>>}`
    : Key
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

// Import type from translation file
import type enTranslations from '@/locales/en.json';
export type TranslationKey = Path<typeof enTranslations>;
