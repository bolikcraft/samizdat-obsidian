import test from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { noteSlug, slugFromTitle, validateSlug } from '../src/core/slug.ts';
import { setLocale } from '../src/i18n/index.ts';

setLocale('en');

const bytes = (text: string) => new TextEncoder().encode(text).length;

// Cases from SluggerTests.cs. The plugin and the CLI must give the same slug for one title.
const cases: [string, string][] = [
  ['Привет, мир!', 'privet-mir'],
  ['Обновление Proxmox 8.2', 'obnovlenie-proxmox-8-2'],
  ['  Ёжик   в  тумане ', 'ezhik-v-tumane'],
  ['Щи & борщ', 'schi-borsch'],
  ['---', 'bez-nazvaniya'],
  ['Съешь же ещё этих мягких французских булок, да выпей чаю',
   'sesh-zhe-esche-etih-myagkih-francuzskih-bulok-da-vypey-chayu'],
  ['Ёлка и йогурт', 'elka-i-yogurt'],
  ['Щука, объём, подъезд', 'schuka-obem-podezd'],
  ['ЭХО Юга Я', 'eho-yuga-ya'],
  ['Proxmox и Docker: 2 ноды', 'proxmox-i-docker-2-nody'],
  ['mix Привет 日本', 'mix-privet'],
  ['Über', 'uber'],
  ['Café', 'cafe'],
  ['Straße', 'strasse'],
  ['Łódź', 'lodz'],
  ['Æsir ø', 'aesir-o'],
  ['Київ', 'kiyiv'],
  ['Ґанок і їжак, є', 'ganok-i-yizhak-ye'],
  ['Вўліца', 'vulica'],
  ['日本語', '日本語'],
  ['مرحبا بالعالم', 'مرحبا-بالعالم'],
  ['हिन्दी', 'हिन्दी'],
  ['Αθήνα', 'αθήνα'],
  ['Мой \u{1F389} праздник', 'moy-prazdnik'],
  ['\u{1F389}', 'bez-nazvaniya'],
  ['日本語 \u{1F389}', '日本語'],
  ['\u{20000}字', '\u{20000}字'],
  ['\u{1D400}', '\u{1D400}'],
  ['İstanbul', 'istanbul'],
  ['می\u200Cخواهم', 'می\u200Cخواهم'],
  ['\u200Cمی\u200D', 'می'],
  ['日 \u200D本', '日-本'],
  ['\u0301', 'bez-nazvaniya'],
  ['\u0301日本', '日本'],
  ['日 \u0301本', '日-本'],
];

for (const [title, expected] of cases) {
  test(`slug для «${title}» как в CLI`, () => {
    assert.equal(slugFromTitle(title), expected);
  });
}

// Samizdat.Core Slugger.FromTitle made these values.
test('slug совпадает с образцами из C#', () => {
  const vectors = JSON.parse(readFileSync(new URL('./slug-vectors.json', import.meta.url), 'utf8')) as [string, string][];
  for (const [title, expected] of vectors) {
    assert.equal(slugFromTitle(title), expected, JSON.stringify(title));
  }
});

test('два разных нелатинских заголовка не делят slug', () => {
  assert.notEqual(slugFromTitle('日本語'), slugFromTitle('中文'));
});

test('заголовок в NFD даёт тот же slug, что в NFC', () => {
  assert.equal(slugFromTitle('Мой ёж'.normalize('NFD')), 'moy-ezh');
});

test('длинный заголовок режется до 200 байт без дефиса в конце', () => {
  const slug = slugFromTitle('Щука '.repeat(60));
  assert.ok(bytes(slug) <= 200);
  assert.ok(!slug.endsWith('-'));
  assert.ok(slug.startsWith('schuka-schuka'));
});

test('длинный нелатинский заголовок режется по границе знака', () => {
  assert.equal(slugFromTitle('日本語'.repeat(40)), '日本語'.repeat(22));
});

test('знаки вне BMP дают slug, который проходит проверку', () => {
  for (const title of ['Мой \u{1F389} праздник', '日本語 \u{1F389}', '\u{20000}字', '\u{1D400}']) {
    assert.equal(validateSlug(slugFromTitle(title)), slugFromTitle(title));
  }
});

// Cases from SafeNameTests.cs.
test('хороший явный slug возвращается как есть', () => {
  for (const slug of ['privet-mir', 'Привет', '日本語', 'dostup', 'a'.repeat(200)]) {
    assert.equal(validateSlug(slug), slug);
  }
});

test('плохой явный slug отвергается', () => {
  const bad = ['', '   ', 'a/b', 'a\\b', 'a\u0001b', 'a\tb', 'a\u007Fb', 'a\u0085b', '..', 'a..b', '.hidden',
               'a%2fb', 'a?b', 'a#b', 'я'.repeat(101)];
  for (const slug of bad) {
    assert.throws(() => validateSlug(slug), Error, JSON.stringify(slug));
  }
});

test('причина отказа названа словами', () => {
  assert.throws(() => validateSlug('   '), /is empty/);
  assert.throws(() => validateSlug('a/b'), /must not contain \//);
  assert.throws(() => validateSlug('../secret'), /must not contain “\.\.”/);
  assert.throws(() => validateSlug('.hidden'), /must not start/);
  assert.throws(() => validateSlug('a\u0001b'), /control characters/);
  assert.throws(() => validateSlug('a?b'), /\?, # or %/);
  assert.throws(() => validateSlug('я'.repeat(101)), /200 bytes/);
});

// VaultScanner in the CLI: an explicit slug wins, then the title, then the file name.
test('slug заметки берётся из шапки, потом из title, потом из имени файла', () => {
  assert.equal(noteSlug({ slug: 'dostup', title: 'Заголовок' }, 'Файл'), 'dostup');
  assert.equal(noteSlug({ title: 'Заголовок' }, 'Файл'), 'zagolovok');
  assert.equal(noteSlug({}, 'Файл'), 'fayl');
  assert.equal(noteSlug({ slug: null, title: null }, 'Файл'), 'fayl');
});

test('пустой title даёт запасной slug, как в CLI', () => {
  assert.equal(noteSlug({ title: '' }, 'Файл'), 'bez-nazvaniya');
});

test('пустой явный slug отвергается, как в CLI', () => {
  assert.throws(() => noteSlug({ slug: '' }, 'Файл'), /is empty/);
  assert.throws(() => noteSlug({ slug: '   ' }, 'Файл'), /is empty/);
});
