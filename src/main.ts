import { MarkdownView, Menu, Platform, Plugin, TFile } from 'obsidian';
import { t } from './i18n/index.ts';
import { PublishAction } from './plugin/action.ts';
import { applyLanguage } from './plugin/language.ts';
import { DEFAULT_SETTINGS, SamizdatSettingTab, type SamizdatSettings } from './plugin/settings.ts';

const MODIFY_DEBOUNCE_MS = 500;

export default class SamizdatPlugin extends Plugin {
  settings: SamizdatSettings = DEFAULT_SETTINGS;
  private action!: PublishAction;
  private status: HTMLElement | null = null;
  private modifyTimer: number | undefined;

  async onload() {
    await this.loadSettings();
    applyLanguage(this.settings.language);
    this.action = new PublishAction(this.app, this.settings);
    this.addSettingTab(new SamizdatSettingTab(this.app, this));

    if (!Platform.isMobile) {
      this.status = this.addStatusBarItem();
      this.status.addClass('mod-clickable');
      this.status.onclick = () => this.trigger(this.activeFile());
    }

    this.addCommand({
      id: 'publish-note',
      name: t('command.publish'),
      callback: () => this.trigger(this.activeFile()),
    });

    this.addCommand({
      id: 'check-server',
      name: t('command.check'),
      callback: async () => { await this.action.refresh(); this.redraw(); },
    });

    this.registerEvent(this.app.workspace.on('file-menu', (menu: Menu, file) => {
      if (!(file instanceof TFile) || file.extension !== 'md') return;
      menu.addItem(item => item
        .setTitle(t('menu.publish'))
        .setIcon('upload')
        .onClick(() => this.trigger(file)));
    }));

    this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.redraw()));

    this.registerEvent(this.app.vault.on('modify', file => {
      if (file.path !== this.activeFile()?.path) return;
      window.clearTimeout(this.modifyTimer);
      this.modifyTimer = window.setTimeout(() => this.redraw(), MODIFY_DEBOUNCE_MS);
    }));

    await this.action.refresh();
    this.redraw();
  }

  onunload() {
    window.clearTimeout(this.modifyTimer);
  }

  private activeFile(): TFile | null {
    return this.app.workspace.getActiveViewOfType(MarkdownView)?.file ?? null;
  }

  private trigger(file: TFile | null): void {
    this.action.run(file, () => this.redraw());
    this.redraw();
  }

  async redraw(): Promise<void> {
    if (!this.status) return;
    if (this.action.isBusy()) { this.status.setText(t('status.busy')); return; }

    const file = this.activeFile();
    const path = file?.path ?? null;
    try {
      const state = await this.action.stateOf(file);
      if (this.activeFile()?.path !== path) return; // заметку успели сменить, пока читали эту
      this.status.setText(state === null ? '' : t('status.label', { label: this.action.label(state) }));
    } catch {
      if (this.activeFile()?.path !== path) return;
      this.status.setText(t('status.unreadable'));
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
