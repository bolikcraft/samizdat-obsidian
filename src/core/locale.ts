const FALLBACK = 'en';

/// Коды Obsidian вместо наших. `zh-TW` нужен явно: иначе он дойдёт до словаря
/// по общему коду `zh` и тайваньский Obsidian получит упрощённый китайский.
const ALIASES: Record<string, string> = {
  zh: 'zh-Hans',
  'zh-TW': 'zh-Hant',
  pt: 'pt-BR',
};

export function pickLocale(requested: string | null, available: string[]): string {
  if (!requested) return FALLBACK;

  const base = requested.split('-')[0];
  const tries = [requested, ALIASES[requested], base, ALIASES[base]];
  for (const code of tries) {
    if (code && available.includes(code)) return code;
  }
  return FALLBACK;
}
