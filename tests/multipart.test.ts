import test from 'node:test';
import assert from 'node:assert';
import { buildMultipart } from '../src/core/multipart.ts';

const utf8 = (text: string) => new TextEncoder().encode(text);
const asText = (body: ArrayBuffer) => new TextDecoder('utf-8').decode(body);

test('тело содержит папку, index.md и вложение', () => {
  const { body, contentType } = buildMultipart(utf8('# Привет'), 'Заметки/Свои', [
    { name: 'kot.png', bytes: new Uint8Array([1, 2, 3]) },
  ], 'Заметка');

  const text = asText(body);
  const boundary = contentType.split('boundary=')[1];

  assert.ok(contentType.startsWith('multipart/form-data; boundary='));
  assert.ok(text.includes(`--${boundary}`));
  assert.ok(text.includes('name="folder"'));
  assert.ok(text.includes('Заметки/Свои'));
  assert.ok(text.includes('name="index.md"; filename="index.md"'));
  assert.ok(text.includes('# Привет'));
  assert.ok(text.includes('name="attachments"; filename="kot.png"'));
  assert.ok(text.endsWith(`--${boundary}--\r\n`));
});

test('пустая папка тоже уезжает полем', () => {
  const { body } = buildMultipart(utf8('текст'), '', [], 'заметка');
  assert.ok(asText(body).includes('name="folder"'));
});

test('байты вложения не портятся', () => {
  const bytes = new Uint8Array([0, 255, 10, 13, 200]);
  const { body } = buildMultipart(utf8('т'), '', [{ name: 'a.bin', bytes }], 'заметка');

  const whole = new Uint8Array(body);
  let found = false;
  for (let start = 0; start + bytes.length <= whole.length; start++) {
    if (bytes.every((byte, shift) => whole[start + shift] === byte)) { found = true; break; }
  }
  assert.ok(found, 'байты вложения должны лежать в теле подряд');
});

test('у каждого запроса своя граница', () => {
  const one = buildMultipart(utf8('a'), '', [], 'заметка').contentType;
  const two = buildMultipart(utf8('a'), '', [], 'заметка').contentType;
  assert.notEqual(one, two);
});

test('кавычка в имени файла не ломает заголовок части', () => {
  const { body } = buildMultipart(utf8('т'), '', [{ name: 'кот"1.png', bytes: new Uint8Array([1]) }], 'заметка');
  const text = asText(body);
  assert.ok(text.includes('filename="кот\\"1.png"'));
});

test('перевод строки в имени файла не создаёт лишних границ', () => {
  const { body, contentType } = buildMultipart(utf8('т'), '', [
    { name: 'a\r\n--boundary--\r\nb.png', bytes: new Uint8Array([1]) },
  ], 'заметка');
  const boundary = contentType.split('boundary=')[1];
  const text = asText(body);
  const occurrences = text.split(`--${boundary}`).length - 1;
  assert.equal(occurrences, 5); // folder, name, index.md, вложение, финальная граница — и ни одной лишней
});

test('имя заметки уезжает полем name, как в CLI', () => {
  const { body } = buildMultipart(utf8('текст'), '', [], 'Моя заметка');
  const text = asText(body);
  assert.ok(text.includes('Content-Disposition: form-data; name="name"\r\n\r\nМоя заметка\r\n'));
});
