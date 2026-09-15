import { en, type Strings } from './strings.ts';
import { ru } from './locales/ru.ts';

/// Реестр языков. Новый язык — файл в locales/ и строка здесь.
export const LOCALES: Record<string, Strings> = {
  en,
  ru,
};

let current: Strings = en;

export function setLocale(code: string): void {
  current = LOCALES[code] ?? en;
}

export function localeCodes(): string[] {
  return Object.keys(LOCALES);
}

/// Название языка на нём самом — для списка в настройках.
export function localeName(code: string): string {
  return (LOCALES[code] ?? en)['language.name'];
}

export function t(key: keyof Strings, params?: Record<string, string | number>): string {
  const text = current[key] ?? en[key];
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g,
    (whole, name: string) => name in params ? String(params[name]) : whole);
}

export type { Strings };
