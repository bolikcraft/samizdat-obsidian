import test from 'node:test';
import assert from 'node:assert';
import { articleHash } from '../src/core/hash.ts';

const utf8 = (text: string) => new TextEncoder().encode(text);

test('заметка без вложений совпадает с образцом сервера', async () => {
  const hash = await articleHash(utf8('# Привет\n'), 'Заметки', [], null);
  assert.equal(hash, 'aa549ae03a2e87ccd9048f6f6720d7d31608657e9558e4328ede99af1dd630e7');
});

test('одно вложение совпадает с образцом сервера', async () => {
  const hash = await articleHash(utf8('текст'), '', [
    { name: 'a.png', bytes: new Uint8Array([1, 2, 3]) },
  ], null);
  assert.equal(hash, 'c4f5d0da41fd7971cb1662c383c7c537792b8b78bd19fbc0941d52a2aaf321e4');
});

test('вложения сортируются по имени, порядок на входе не важен', async () => {
  const expected = 'a87ec524cef86f1c01fcb0379f0fe16a612ed0ab640484c12ea58ecfcc885a65';

  const straight = await articleHash(utf8('текст'), '', [
    { name: 'a.png', bytes: new Uint8Array([1, 2, 3]) },
    { name: 'b.png', bytes: new Uint8Array([4]) },
  ], null);
  const reversed = await articleHash(utf8('текст'), '', [
    { name: 'b.png', bytes: new Uint8Array([4]) },
    { name: 'a.png', bytes: new Uint8Array([1, 2, 3]) },
  ], null);

  assert.equal(straight, expected);
  assert.equal(reversed, expected);
});

test('папка входит в хэш', async () => {
  const inRoot = await articleHash(utf8('текст'), '', [], null);
  const inFolder = await articleHash(utf8('текст'), 'Заметки', [], null);
  assert.notEqual(inRoot, inFolder);
});

// Server ArticleHash.Compute made these values with the same note name.
test('имя заметки входит в хэш, как на сервере', async () => {
  assert.equal(await articleHash(utf8('a'), '', [], null),
    'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');
  assert.equal(await articleHash(utf8('# Привет\n'), 'Заметки', [], 'Моя заметка'),
    'e4d3939a3eea5820a19dcd27d7b3333a2a18cd67a63f6e0271e2598c54ca2782');
  assert.equal(await articleHash(utf8('текст'), '', [
    { name: 'b.png', bytes: utf8('4') },
    { name: 'a.png', bytes: utf8('123') },
  ], 'a.b'), '85395a3fe9e4781b9eef9b87f994be74296de7b5980ad81f713e84c0c8f9313b');
});

// The server ignores an empty name field.
test('пустое имя даёт хэш без имени, как на сервере', async () => {
  assert.equal(await articleHash(utf8('a'), '', [], ''),
    'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');
});
