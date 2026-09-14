import { MarkdownView, Menu, Platform, Plugin, TFile } from 'obsidian';
import { PublishAction } from './plugin/action.ts';
import { DEFAULT_SETTINGS, SamizdatSettingTab, type SamizdatSettings } from './plugin/settings.ts';

export default class SamizdatPlugin extends Plugin {
  settings: SamizdatSettings = DEFAULT_SETTINGS;
  private action!: PublishAction;
  private status: HTMLElement | null = null;

  async onload() {
    await this.loadSettings();
    this.action = new PublishAction(this.app, this.settings);
    this.addSettingTab(new SamizdatSettingTab(this.app, this));

    if (!Platform.isMobile) {
      this.status = this.addStatusBarItem();
      this.status.addClass('mod-clickable');
      this.status.onclick = () => this.action.run(this.activeFile(), () => this.redraw());
    }

    this.addCommand({
      id: 'publish-note',
      name: 'Опубликовать заметку',
      callback: () => this.action.run(this.activeFile(), () => this.redraw()),
    });

    this.addCommand({
      id: 'check-server',
      name: 'Проверить связь с сервером',
      callback: async () => { await this.action.refresh(); this.redraw(); },
    });

    this.registerEvent(this.app.workspace.on('file-menu', (menu: Menu, file) => {
      if (!(file instanceof TFile) || file.extension !== 'md') return;
      menu.addItem(item => item
        .setTitle('Samizdat: опубликовать')
        .setIcon('upload')
        .onClick(() => this.action.run(file, () => this.redraw())));
    }));

    this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.redraw()));
    this.registerEvent(this.app.vault.on('modify', () => this.redraw()));

    await this.action.refresh();
    this.redraw();
  }

  private activeFile(): TFile | null {
    return this.app.workspace.getActiveViewOfType(MarkdownView)?.file ?? null;
  }

  private async redraw(): Promise<void> {
    if (!this.status) return;
    const state = await this.action.stateOf(this.activeFile());
    this.status.setText(state === null ? '' : `Samizdat: ${this.action.label(state)}`);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
