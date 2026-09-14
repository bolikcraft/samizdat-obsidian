const CYRILLIC: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
  'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
  'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
  'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
  'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
  'э': 'e', 'ю': 'yu', 'я': 'ya',
};

const FALLBACK = 'bez-nazvaniya';

export function slugFromTitle(title: string): string {
  let out = '';
  for (const symbol of title.toLowerCase()) {
    if (symbol in CYRILLIC) out += CYRILLIC[symbol];
    else if (/[a-z0-9]/.test(symbol)) out += symbol;
    else out += '-';
  }

  const slug = out.split('-').filter(part => part.length > 0).join('-');
  return slug.length === 0 ? FALLBACK : slug;
}

/// slug идёт прямо в адрес и в имя каталога на сервере: чужой хост через `//` и выход
/// за пределы каталога статей через `..` быть не должны.
export function validateSlug(slug: string): string {
  if (slug.trim().length === 0) throw new Error('пустой slug');
  if (slug.includes('/') || slug.includes('\\')) throw new Error(`slug «${slug}» не должен содержать / или \\`);
  if (slug.includes('..')) throw new Error(`slug «${slug}» не должен содержать «..»`);
  if (slug.startsWith('.')) throw new Error(`slug «${slug}» не должен начинаться с точки`);
  return slug;
}
