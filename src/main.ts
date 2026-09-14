import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, SamizdatSettingTab, type SamizdatSettings } from './plugin/settings.ts';

export default class SamizdatPlugin extends Plugin {
  settings: SamizdatSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SamizdatSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
