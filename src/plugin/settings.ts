import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import type SamizdatPlugin from '../main.ts';
import { SamizdatClient } from './client.ts';

export interface SamizdatSettings {
  serverUrl: string;
  token: string;
}

export const DEFAULT_SETTINGS: SamizdatSettings = {
  serverUrl: 'http://127.0.0.1:5080',
  token: '',
};

export class SamizdatSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: SamizdatPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Адрес сервера')
      .setDesc('Например http://127.0.0.1:5080')
      .addText(text => text
        .setValue(this.plugin.settings.serverUrl)
        .onChange(async value => {
          this.plugin.settings.serverUrl = value.trim();
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Токен')
      .setDesc('Настройки сайта → Токены → выпустить новый')
      .addText(text => {
        text.inputEl.type = 'password';
        text.setValue(this.plugin.settings.token)
            .onChange(async value => {
              this.plugin.settings.token = value.trim();
              await this.plugin.saveSettings();
            });
      });

    new Setting(containerEl)
      .setName('Связь с сервером')
      .addButton(button => button
        .setButtonText('Проверить')
        .onClick(async () => {
          try {
            const state = await new SamizdatClient(
              this.plugin.settings.serverUrl, this.plugin.settings.token).state();
            new Notice(`Связь есть. Статей на сервере: ${Object.keys(state).length}`);
          } catch (error) {
            new Notice(`Не вышло: ${(error as Error).message}`);
          }
        }));
  }
}
