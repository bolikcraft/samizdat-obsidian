import { pickLocale } from '../core/locale.ts';
import { localeCodes, setLocale } from '../i18n/index.ts';

/// Свой язык Obsidian держит в localStorage; пусто — значит английский.
export function applyLanguage(setting: string): void {
  const requested = setting === 'auto' ? window.localStorage.getItem('language') : setting;
  setLocale(pickLocale(requested, localeCodes()));
}
