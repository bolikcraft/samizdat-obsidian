export interface Attachment {
  name: string;
  bytes: Uint8Array;
}

export async function articleHash(markdown: Uint8Array, folder: string,
                                  attachments: Attachment[], name: string | null): Promise<string> {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [markdown, encoder.encode(folder)];

  // Сортировка по коду символа — то же, что StringComparer.Ordinal на сервере.
  const sorted = [...attachments].sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  for (const item of sorted) {
    parts.push(encoder.encode(item.name));
    parts.push(item.bytes);
  }

  // A zero byte separates the name from the last attachment. The server ignores an empty name.
  if (name) {
    parts.push(new Uint8Array([0]));
    parts.push(encoder.encode(name));
  }

  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const buffer = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    buffer.set(part, offset);
    offset += part.length;
  }

  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}
