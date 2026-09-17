import test from 'node:test';
import assert from 'node:assert';
import { embedFileName, isAttachmentName } from '../src/core/attachment.ts';

// Cases from SafeNameTests.cs.
test('плохое имя вложения отвергается', () => {
  const bad = ['index.md', 'INDEX.MD', 'Index.Md', 'a\\b.png', '..\\..\\evil.exe', 'a/b.png', 'bad\u0001.png',
               '.', '..', '', 'index.md ', 'index.md.', 'index.md...', 'index.md  ', 'INDEX.MD .'];
  for (const name of bad) {
    assert.equal(isAttachmentName(name), false, JSON.stringify(name));
  }
});

test('обычное имя вложения принимается', () => {
  for (const name of ['схема.png', '日本.png', 'index.md.png', 'old-index.md']) {
    assert.equal(isAttachmentName(name), true, name);
  }
});

// The CLI takes the attachment name from the link text, not from the file on disk.
test('имя вложения берётся из текста ссылки, как в CLI', () => {
  assert.equal(embedFileName('![[схема.png]]'), 'схема.png');
  assert.equal(embedFileName('![[scheme.png|300]]'), 'scheme.png');
  assert.equal(embedFileName('![[photo.jpg|300x200]]'), 'photo.jpg');
  assert.equal(embedFileName('![[doc.pdf#page=2]]'), 'doc.pdf');
  assert.equal(embedFileName('![[assets/Cap.PNG]]'), 'Cap.PNG');
  assert.equal(embedFileName('![[ pic.png ]]'), 'pic.png');
  assert.equal(embedFileName('![подпись](img/cover.png)'), 'cover.png');
  assert.equal(embedFileName('![](/x/img/my%20cover.png)'), 'my cover.png');
  assert.equal(embedFileName('![](100%.png)'), '100%.png');
});

test('внешняя картинка не вложение', () => {
  assert.equal(embedFileName('![](https://example.com/a.png)'), null);
  assert.equal(embedFileName('![[HTTP.png]]'), null);
});
