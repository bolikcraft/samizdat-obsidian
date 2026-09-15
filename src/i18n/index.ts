import { en, type Strings } from './strings.ts';
import { de } from './locales/de.ts';
import { es } from './locales/es.ts';
import { fr } from './locales/fr.ts';
import { id } from './locales/id.ts';
import { it } from './locales/it.ts';
import { pl } from './locales/pl.ts';
import { ptBR } from './locales/pt-BR.ts';
import { ru } from './locales/ru.ts';
import { tr } from './locales/tr.ts';
import { uk } from './locales/uk.ts';
import { zhHans } from './locales/zh-Hans.ts';

/// Реестр языков. Новый язык — файл в locales/ и строка здесь.
export const LOCALES: Record<string, Strings> = {
  en,
  de,
  es,
  fr,
  id,
  it,
  pl,
  'pt-BR': ptBR,
  ru,
  tr,
  uk,
  'zh-Hans': zhHans,
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
