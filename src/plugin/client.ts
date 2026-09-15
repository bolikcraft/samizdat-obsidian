import { requestUrl, type RequestUrlParam, type RequestUrlResponse } from 'obsidian';
import type { Attachment } from '../core/hash.ts';
import { buildMultipart } from '../core/multipart.ts';
import { t } from '../i18n/index.ts';

export class OfflineError extends Error {
  constructor(address: string) {
    super(t('error.offline', { address }));
    this.name = 'OfflineError';
  }
}

export class SamizdatClient {
  constructor(private url: string, private token: string) {}

  private get base(): string {
    return this.url.replace(/\/+$/, '');
  }

  // requestUrl падает (а не возвращает статус), когда до сервера не достучаться вовсе.
  private async request(options: RequestUrlParam): Promise<RequestUrlResponse> {
    try {
      return await requestUrl(options);
    } catch {
      throw new OfflineError(this.base);
    }
  }

  async state(): Promise<Record<string, string>> {
    const answer = await this.request({
      url: `${this.base}/api/state`,
      headers: { Authorization: `Bearer ${this.token}` },
      throw: false,
    });
    if (answer.status === 401) throw new Error(t('error.token'));
    if (answer.status !== 200) throw new Error(t('error.status', { status: answer.status }));
    return answer.json as Record<string, string>;
  }

  async put(slug: string, markdown: Uint8Array, folder: string,
            attachments: Attachment[]): Promise<string> {
    const { body, contentType } = buildMultipart(markdown, folder, attachments);
    const answer = await this.request({
      url: `${this.base}/api/articles/${encodeURIComponent(slug)}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': contentType },
      body,
      throw: false,
    });
    if (answer.status === 401) throw new Error(t('error.token'));
    if (answer.status !== 200) throw new Error(answer.text || t('error.status', { status: answer.status }));
    return (answer.json as { hash: string }).hash;
  }

  async remove(slug: string): Promise<void> {
    const answer = await this.request({
      url: `${this.base}/api/articles/${encodeURIComponent(slug)}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.token}` },
      throw: false,
    });
    if (answer.status === 401) throw new Error(t('error.token'));
    if (answer.status !== 200) throw new Error(answer.text || t('error.status', { status: answer.status }));
  }
}
