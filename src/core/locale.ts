const FALLBACK = 'en';

/// Общий код языка вместо конкретного словаря: Obsidian просит `zh`, а словарь один.
const ALIASES: Record<string, string> = {
  zh: 'zh-Hans',
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
