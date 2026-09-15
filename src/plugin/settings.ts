import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import { localeCodes, localeName, t } from '../i18n/index.ts';
import type SamizdatPlugin from '../main.ts';
import { SamizdatClient } from './client.ts';
import { applyLanguage } from './language.ts';

export interface SamizdatSettings {
  serverUrl: string;
  token: string;
  /// 'auto' — как в Obsidian, иначе код языка.
  language: string;
}

export const DEFAULT_SETTINGS: SamizdatSettings = {
  serverUrl: 'http://127.0.0.1:5080',
  token: '',
  language: 'auto',
};

export class SamizdatSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: SamizdatPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName(t('settings.language.name'))
      .setDesc(t('settings.language.desc'))
      .addDropdown(drop => {
        drop.addOption('auto', t('settings.language.auto'));
        for (const code of localeCodes()) drop.addOption(code, localeName(code));
        drop.setValue(this.plugin.settings.language)
            .onChange(async value => {
              this.plugin.settings.language = value;
              await this.plugin.saveSettings();
              applyLanguage(value);
              await this.plugin.redraw();
              this.display();
            });
      });

    new Setting(containerEl)
      .setName(t('settings.server.name'))
      .setDesc(t('settings.server.desc'))
      .addText(text => text
        .setValue(this.plugin.settings.serverUrl)
        .onChange(async value => {
          this.plugin.settings.serverUrl = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName(t('settings.token.name'))
      .setDesc(t('settings.token.desc'))
      .addText(text => {
        text.inputEl.type = 'password';
        text.setValue(this.plugin.settings.token)
            .onChange(async value => {
              this.plugin.settings.token = value.trim();
              await this.plugin.saveSettings();
            });
      });

    new Setting(containerEl)
      .setName(t('settings.connection.name'))
      .addButton(button => button
        .setButtonText(t('settings.connection.button'))
        .onClick(async () => {
          try {
            const state = await new SamizdatClient(
              this.plugin.settings.serverUrl, this.plugin.settings.token).state();
            new Notice(t('settings.connection.ok', { count: Object.keys(state).length }));
          } catch (error) {
            new Notice(t('settings.connection.fail', { error: (error as Error).message }));
          }
        }));
  }
}
