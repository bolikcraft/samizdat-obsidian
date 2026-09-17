import type { Attachment } from './hash.ts';

export interface MultipartBody {
  body: ArrayBuffer;
  contentType: string;
}

export function buildMultipart(markdown: Uint8Array, folder: string,
                               attachments: Attachment[], name: string): MultipartBody {
  const boundary = `samizdat${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];

  const push = (text: string) => parts.push(encoder.encode(text));

  push(`--${boundary}\r\nContent-Disposition: form-data; name="folder"\r\n\r\n${folder}\r\n`);
  push(`--${boundary}\r\nContent-Disposition: form-data; name="name"\r\n\r\n${name}\r\n`);

  push(`--${boundary}\r\nContent-Disposition: form-data; name="index.md"; filename="index.md"\r\n` +
       'Content-Type: text/markdown\r\n\r\n');
  parts.push(markdown);
  push('\r\n');

  for (const item of attachments) {
    push(`--${boundary}\r\nContent-Disposition: form-data; name="attachments"; filename="${escapeFilename(item.name)}"\r\n` +
         'Content-Type: application/octet-stream\r\n\r\n');
    parts.push(item.bytes);
    push('\r\n');
  }

  push(`--${boundary}--\r\n`);

  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const body = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.length;
  }

  return { body: body.buffer, contentType: `multipart/form-data; boundary=${boundary}` };
}

// \r и \n рвут строку заголовка; " и \ подставляем экранированными, чтобы не сломать её разбор.
function escapeFilename(name: string): string {
  return name.replace(/[\r\n]/g, '').replace(/[\\"]/g, char => `\\${char}`);
}
