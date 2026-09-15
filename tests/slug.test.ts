import test from 'node:test';
import assert from 'node:assert';
import { slugFromTitle, validateSlug } from '../src/core/slug.ts';
import { setLocale } from '../src/i18n/index.ts';

setLocale('en');

test('латиница едет как есть', () => {
  assert.equal(slugFromTitle('Hello World'), 'hello-world');
});

test('кириллица переводится в латиницу', () => {
  assert.equal(slugFromTitle('Как устроен Самиздат'), 'kak-ustroen-samizdat');
});

test('щ, ё, ъ и ь по таблице CLI', () => {
  assert.equal(slugFromTitle('Ёжик щётка объём'), 'ezhik-schetka-obem');
});

test('знаки становятся дефисом, дефисы не множатся', () => {
  assert.equal(slugFromTitle('Один — два!!!  три'), 'odin-dva-tri');
});

test('пустой заголовок даёт запасное имя', () => {
  assert.equal(slugFromTitle('!!!'), 'bez-nazvaniya');
});

test('явный slug с косой чертой отвергается', () => {
  assert.throws(() => validateSlug('a/b'), /must not contain/);
});

test('явный slug с двумя точками отвергается', () => {
  assert.throws(() => validateSlug('../secret'), /must not contain/);
});

test('явный slug с точки в начале отвергается', () => {
  assert.throws(() => validateSlug('.hidden'), /must not start/);
});

test('пустой явный slug отвергается', () => {
  assert.throws(() => validateSlug('   '), /is empty/);
});

test('хороший явный slug возвращается как есть', () => {
  assert.equal(validateSlug('dostup'), 'dostup');
});
