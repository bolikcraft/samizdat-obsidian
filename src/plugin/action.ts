import { App, Notice, TFile } from 'obsidian';
import { articleHash } from '../core/hash.ts';
import { buttonLabel, buttonState, type ButtonState } from '../core/state.ts';
import { SamizdatClient } from './client.ts';
import { readNote } from './note.ts';
import type { SamizdatSettings } from './settings.ts';

export class PublishAction {
  private serverState: Record<string, string> = {};
  private offline = true;
  private busy = false;

  constructor(private app: App, private settings: SamizdatSettings) {}

  private get client(): SamizdatClient {
    return new SamizdatClient(this.settings.serverUrl, this.settings.token);
  }

  async refresh(): Promise<void> {
    try {
      this.serverState = await this.client.state();
      this.offline = false;
    } catch {
      this.offline = true;
    }
  }

  async stateOf(file: TFile | null): Promise<ButtonState | null> {
    if (!file || file.extension !== 'md') return null;
    if (this.offline) return 'offline';

    const note = await readNote(this.app, file);
    const known = this.serverState[note.slug];
    const hash = await articleHash(note.markdown, note.folder, note.attachments);

    return buttonState({ published: note.published, onServer: known !== undefined, sameHash: known === hash });
  }

  async run(file: TFile | null, onDone: () => void): Promise<void> {
    if (!file || this.busy) return;
    if (this.settings.token.length === 0 || this.settings.serverUrl.length === 0) {
      new Notice('Откройте настройки плагина: нет адреса или токена');
      return;
    }

    this.busy = true;
    try {
      const state = await this.stateOf(file);
      if (state === 'offline') { await this.refresh(); return; }
      if (state === 'draft') { await this.markPublishable(file); return; }

      const note = await readNote(this.app, file);
      if (state === 'published') {
        if (!confirm(`Снять «${file.basename}» с публикации? Гостевые ссылки на неё перестанут работать.`)) return;
        await this.client.remove(note.slug);
        delete this.serverState[note.slug];
        new Notice('Статья снята с публикации');
        return;
      }

      const hash = await this.client.put(note.slug, note.markdown, note.folder, note.attachments);
      this.serverState[note.slug] = hash;
      new Notice(state === 'changed' ? 'Статья обновлена' : 'Статья опубликована');
    } catch (error) {
      new Notice((error as Error).message);
      if ((error as Error).message.includes('Сервер ответил')) this.offline = false;
    } finally {
      this.busy = false;
      onDone();
    }
  }

  /// «Оформить»: publish ставим всегда, чужие title и description не перетираем.
  private async markPublishable(file: TFile): Promise<void> {
    const text = await this.app.vault.read(file);
    const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim();

    await this.app.fileManager.processFrontMatter(file, front => {
      front.publish = true;
      if (!front.title) front.title = heading ?? file.basename;
      if (front.description === undefined) front.description = '';
    });

    new Notice('Заметка оформлена. Нажмите ещё раз, чтобы опубликовать');
  }

  label(state: ButtonState | null): string {
    return state === null ? '' : buttonLabel(state);
  }
}
