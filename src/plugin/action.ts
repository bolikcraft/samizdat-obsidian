import { App, Notice, TFile } from 'obsidian';
import { articleHash } from '../core/hash.ts';
import { buttonLabel, buttonState, type ButtonState } from '../core/state.ts';
import { OfflineError, SamizdatClient } from './client.ts';
import { readNote, type NoteSnapshot } from './note.ts';
import type { SamizdatSettings } from './settings.ts';

export const BUSY_LABEL = 'Samizdat: отправляю…';

export class PublishAction {
  private serverState: Record<string, string> = {};
  private offline = true;
  private busy = false;
  private lastError: string | null = null;

  constructor(private app: App, private settings: SamizdatSettings) {}

  private get client(): SamizdatClient {
    return new SamizdatClient(this.settings.serverUrl, this.settings.token);
  }

  isBusy(): boolean {
    return this.busy;
  }

  async refresh(): Promise<void> {
    try {
      this.serverState = await this.client.state();
      this.offline = false;
    } catch (error) {
      this.offline = true;
      this.lastError = (error as Error).message;
    }
  }

  async stateOf(file: TFile | null): Promise<ButtonState | null> {
    if (!file || file.extension !== 'md') return null;
    const note = await readNote(this.app, file);
    return this.stateFromNote(note);
  }

  private async stateFromNote(note: NoteSnapshot): Promise<ButtonState> {
    if (this.offline) return buttonState({ published: note.published, onServer: false, sameHash: false, offline: true });

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
      const note = await readNote(this.app, file);
      const state = await this.stateFromNote(note);

      if (state === 'offline') {
        new Notice(this.lastError ?? 'Нет связи с сервером');
        await this.refresh();
        return;
      }
      if (state === 'draft') { await this.markPublishable(file); return; }

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
      if (error instanceof OfflineError) {
        this.offline = true;
        this.lastError = error.message;
      }
      new Notice((error as Error).message);
    } finally {
      this.busy = false;
      onDone();
    }
  }

  /// «Оформить»: publish ставим всегда, чужие title и description не перетираем.
  private async markPublishable(file: TFile): Promise<void> {
    const headings = this.app.metadataCache.getFileCache(file)?.headings ?? [];
    const heading = headings.find(item => item.level === 1)?.heading;

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
