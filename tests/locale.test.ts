import test from 'node:test';
import assert from 'node:assert';
import { pickLocale } from '../src/core/locale.ts';
import { localeCodes } from '../src/i18n/index.ts';

const AVAILABLE = ['en', 'ru', 'zh-Hans', 'pt-BR', 'de'];

test('точное совпадение кода', () => {
  assert.equal(pickLocale('ru', AVAILABLE), 'ru');
  assert.equal(pickLocale('zh-Hans', AVAILABLE), 'zh-Hans');
});

test('общий код ведёт на свой словарь', () => {
  assert.equal(pickLocale('zh', AVAILABLE), 'zh-Hans');
  assert.equal(pickLocale('pt', AVAILABLE), 'pt-BR');
});

test('код с областью ищется по первой части', () => {
  assert.equal(pickLocale('ru-RU', AVAILABLE), 'ru');
  assert.equal(pickLocale('de-AT', AVAILABLE), 'de');
});

test('код с областью доходит до словаря через общий код', () => {
  assert.equal(pickLocale('zh-TW', AVAILABLE), 'zh-Hans');
});

test('пусто — английский: Obsidian так и хранит свой язык по умолчанию', () => {
  assert.equal(pickLocale(null, AVAILABLE), 'en');
  assert.equal(pickLocale('', AVAILABLE), 'en');
});

test('неизвестный язык — английский', () => {
  assert.equal(pickLocale('kl', AVAILABLE), 'en');
  assert.equal(pickLocale('ru', ['en']), 'en');
});

/// Список выше выдуман; здесь проверяем настоящий реестр — коды Obsidian и ALIASES вместе.
test('каждый язык реестра достижим, коды Obsidian ведут на свой словарь', () => {
  const real = localeCodes();
  for (const code of real) {
    assert.equal(pickLocale(code, real), code, `${code} не нашёлся`);
  }
  assert.equal(pickLocale('zh', real), 'zh-Hans');
  assert.equal(pickLocale('zh-TW', real), 'zh-Hant');
  assert.equal(pickLocale('pt', real), 'pt-BR');
});
