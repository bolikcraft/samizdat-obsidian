import test from 'node:test';
import assert from 'node:assert';
import { articleHash } from '../src/core/hash.ts';

const utf8 = (text: string) => new TextEncoder().encode(text);

test('заметка без вложений совпадает с образцом сервера', async () => {
  const hash = await articleHash(utf8('# Привет\n'), 'Заметки', []);
  assert.equal(hash, 'aa549ae03a2e87ccd9048f6f6720d7d31608657e9558e4328ede99af1dd630e7');
});

test('одно вложение совпадает с образцом сервера', async () => {
  const hash = await articleHash(utf8('текст'), '', [
    { name: 'a.png', bytes: new Uint8Array([1, 2, 3]) },
  ]);
  assert.equal(hash, 'c4f5d0da41fd7971cb1662c383c7c537792b8b78bd19fbc0941d52a2aaf321e4');
});

test('вложения сортируются по имени, порядок на входе не важен', async () => {
  const expected = 'a87ec524cef86f1c01fcb0379f0fe16a612ed0ab640484c12ea58ecfcc885a65';

  const straight = await articleHash(utf8('текст'), '', [
    { name: 'a.png', bytes: new Uint8Array([1, 2, 3]) },
    { name: 'b.png', bytes: new Uint8Array([4]) },
  ]);
  const reversed = await articleHash(utf8('текст'), '', [
    { name: 'b.png', bytes: new Uint8Array([4]) },
    { name: 'a.png', bytes: new Uint8Array([1, 2, 3]) },
  ]);

  assert.equal(straight, expected);
  assert.equal(reversed, expected);
});

test('папка входит в хэш', async () => {
  const inRoot = await articleHash(utf8('текст'), '', []);
  const inFolder = await articleHash(utf8('текст'), 'Заметки', []);
  assert.notEqual(inRoot, inFolder);
});
