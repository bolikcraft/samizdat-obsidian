import { t } from '../i18n/index.ts';

const LETTERS: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
  'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
  'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
  'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
  'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
  'э': 'e', 'ю': 'yu', 'я': 'ya',
  'і': 'i', 'ї': 'yi', 'є': 'ye', 'ґ': 'g', 'ў': 'u',
  // These Latin letters do not decompose into a base letter and a mark.
  'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'ø': 'o', 'ł': 'l', 'đ': 'd',
  'ð': 'd', 'þ': 'th', 'ı': 'i', 'ħ': 'h',
};

const FALLBACK = 'bez-nazvaniya';

/// Same limit as SafeName.MaxSlugBytes on the server.
export const MAX_SLUG_BYTES = 200;

const ASCII_LETTER_OR_DIGIT = /^[A-Za-z0-9]$/;
const LETTER_OR_DIGIT = /^[\p{L}\p{Nd}]$/u;
const NON_SPACING_MARK = /^\p{Mn}$/u;
const MARK = /^[\p{Mn}\p{Mc}]$/u;
const JOINERS = new Set(['\u200C', '\u200D']);

/// Port of Samizdat.Core.Slugger. The plugin and the CLI must give the same slug for one title.
export function slugFromTitle(title: string): string {
  // A file name from macOS is in NFD. Without NFC, «й» is «и» and a mark.
  const text = lowerInvariant(title.normalize('NFC'));

  let slug = join(latin(text));
  // A script without a Latin form keeps its own letters.
  if (slug.length === 0) slug = join(native(text));

  slug = cut(slug);
  return slug.length === 0 ? FALLBACK : slug;
}

// .NET ToLowerInvariant changes each code point alone and keeps «İ».
// toLowerCase on the full string gives «i» with a dot and a final «ς».
function lowerInvariant(text: string): string {
  let result = '';
  for (const symbol of text) result += symbol === '\u0130' ? symbol : symbol.toLowerCase();
  return result;
}

function latin(text: string): string {
  let result = '';
  for (const symbol of text) {
    // Look in the table before decomposition: in NFD, «й» is «и» and a mark.
    if (symbol in LETTERS) result += LETTERS[symbol];
    else if (ASCII_LETTER_OR_DIGIT.test(symbol)) result += symbol;
    else result += withoutMarks(symbol);
  }
  return result;
}

function withoutMarks(symbol: string): string {
  let result = '';
  // «İ» stays upper case after lowerInvariant. Decomposition makes it «I» and a dot.
  for (const part of lowerInvariant(symbol.normalize('NFD'))) {
    if (NON_SPACING_MARK.test(part)) continue;
    if (part in LETTERS) result += LETTERS[part];
    else result += ASCII_LETTER_OR_DIGIT.test(part) ? part : '-';
  }
  return result;
}

function native(text: string): string {
  const symbols = [...text];
  let result = '';
  // A mark without a letter before it, or a joiner out of a word, gives a slug of invisible symbols.
  let afterLetter = false;
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    if (LETTER_OR_DIGIT.test(symbol)) afterLetter = true;
    else if (afterLetter && MARK.test(symbol)) afterLetter = true;
    // In Persian and Indic scripts, ZWNJ and ZWJ are part of the word.
    else if (afterLetter && JOINERS.has(symbol) && i + 1 < symbols.length && LETTER_OR_DIGIT.test(symbols[i + 1]))
      afterLetter = false;
    else {
      result += '-';
      afterLetter = false;
      continue;
    }
    result += symbol;
  }
  return result;
}

function join(text: string): string {
  return text.split('-').filter(part => part.length > 0).join('-');
}

function cut(slug: string): string {
  if (utf8Length(slug) <= MAX_SLUG_BYTES) return slug;

  let result = '';
  let bytes = 0;
  for (const symbol of slug) {
    const size = utf8Length(symbol);
    if (bytes + size > MAX_SLUG_BYTES) break;
    bytes += size;
    result += symbol;
  }
  return result.replace(/[-\u200C\u200D]+$/, '');
}

function utf8Length(text: string): number {
  return new TextEncoder().encode(text).length;
}

/// Port of SafeName.SlugProblem. The server uses the same rule and refuses a bad slug.
export function validateSlug(slug: string): string {
  if (slug.trim().length === 0) throw new Error(t('error.slugEmpty'));
  if (slug.includes('..')) throw new Error(t('error.slugDots', { slug }));
  if (slug.startsWith('.')) throw new Error(t('error.slugDot', { slug }));
  if (slug.includes('/') || slug.includes('\\')) throw new Error(t('error.slugSlash', { slug }));
  if (hasControl(slug)) throw new Error(t('error.slugControl', { slug }));
  // In a URL, ?, # and % start a query, a fragment and a percent code.
  if (/[?#%]/.test(slug)) throw new Error(t('error.slugQuery', { slug }));
  if (utf8Length(slug) > MAX_SLUG_BYTES) throw new Error(t('error.slugLong', { slug, max: MAX_SLUG_BYTES }));
  return slug;
}

/// Same as .NET char.IsControl: U+0000–U+001F and U+007F–U+009F.
export function hasControl(text: string): boolean {
  return /[\u0000-\u001F\u007F-\u009F]/.test(text);
}
