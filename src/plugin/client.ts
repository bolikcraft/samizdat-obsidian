import { requestUrl } from 'obsidian';
import type { Attachment } from '../core/hash.ts';
import { buildMultipart } from '../core/multipart.ts';

export class SamizdatClient {
  constructor(private url: string, private token: string) {}

  private get base(): string {
    return this.url.replace(/\/+$/, '');
  }

  async state(): Promise<Record<string, string>> {
    const answer = await requestUrl({
      url: `${this.base}/api/state`,
      headers: { Authorization: `Bearer ${this.token}` },
      throw: false,
    });
    if (answer.status === 401) throw new Error('Токен не подошёл');
    if (answer.status !== 200) throw new Error(`Сервер ответил ${answer.status}`);
    return answer.json as Record<string, string>;
  }

  async put(slug: string, markdown: Uint8Array, folder: string,
            attachments: Attachment[]): Promise<string> {
    const { body, contentType } = buildMultipart(markdown, folder, attachments);
    const answer = await requestUrl({
      url: `${this.base}/api/articles/${encodeURIComponent(slug)}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': contentType },
      body,
      throw: false,
    });
    if (answer.status === 401) throw new Error('Токен не подошёл');
    if (answer.status !== 200) throw new Error(answer.text || `Сервер ответил ${answer.status}`);
    return (answer.json as { hash: string }).hash;
  }

  async remove(slug: string): Promise<void> {
    const answer = await requestUrl({
      url: `${this.base}/api/articles/${encodeURIComponent(slug)}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.token}` },
      throw: false,
    });
    if (answer.status === 401) throw new Error('Токен не подошёл');
    if (answer.status !== 200) throw new Error(answer.text || `Сервер ответил ${answer.status}`);
  }
}
