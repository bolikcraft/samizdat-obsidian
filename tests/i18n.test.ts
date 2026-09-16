import test from 'node:test';
import assert from 'node:assert';
import { LOCALES, setLocale, t } from '../src/i18n/index.ts';
import { en } from '../src/i18n/strings.ts';

test('в каждом языке есть все ключи английского', () => {
  const base = Object.keys(en).sort();
  for (const [code, strings] of Object.entries(LOCALES)) {
    assert.deepEqual(Object.keys(strings).sort(), base, `словарь ${code} разошёлся с базой`);
  }
});

/// Потерянный при переводе {count} не ломает сборку: строка просто выходит без числа.
test('набор плейсхолдеров везде как в английском', () => {
  const marks = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();
  for (const [code, strings] of Object.entries(LOCALES)) {
    for (const [key, text] of Object.entries(en)) {
      assert.deepEqual(marks(strings[key as keyof typeof en]), marks(text), `${code}: ключ ${key}`);
    }
  }
});

test('нигде нет пустых строк', () => {
  for (const [code, strings] of Object.entries(LOCALES)) {
    for (const [key, text] of Object.entries(strings)) {
      assert.ok(text.trim().length > 0, `${code}: пустой ключ ${key}`);
    }
  }
});

test('неизвестный язык откатывается на английский', () => {
  setLocale('kl');
  assert.equal(t('state.new'), en['state.new']);
});

test('плейсхолдер заменяется значением', () => {
  setLocale('en');
  assert.equal(t('error.status', { status: 500 }), 'The server answered 500');
});

test('имя заметки подставляется в вопрос', () => {
  setLocale('en');
  assert.equal(t('confirm.unpublish', { name: 'Заметка' }),
    'Unpublish “Заметка”? Guest links to it will not work any more.');
});

test('без параметров строка остаётся как есть', () => {
  setLocale('en');
  assert.equal(t('status.label'), 'Samizdat: {label}');
});

test('лишний параметр не мешает, а пропущенный оставляет скобки', () => {
  setLocale('en');
  assert.equal(t('status.label', { other: 'x' }), 'Samizdat: {label}');
});
