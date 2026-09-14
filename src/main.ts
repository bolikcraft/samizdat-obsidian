import { Plugin, Notice } from 'obsidian';

export default class SamizdatPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'samizdat-ping',
      name: 'Samizdat: проверка загрузки',
      callback: () => new Notice('Samizdat загрузился'),
    });
  }
}
