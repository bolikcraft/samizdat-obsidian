# Samizdat for Obsidian

Publish the open note to your own [Samizdat](https://github.com/bolikcraft/samizdat) server with
one button.

Samizdat is a small server that keeps your Obsidian notes and shows them as a web site. The site
is behind a login form, and each article can get a link with a time limit. This plugin is the
client: it sends a note from the vault to that server.

## Why

Samizdat has a command line tool. It works, but it asks for a terminal, and you must write
`publish: true` into the note yourself. The terminal is also not available on a phone.

This plugin does the same work from inside Obsidian, on a computer and on a phone.

## What the button does

The button sits in the status bar at the bottom right. It shows the state of the open note:

| The button says | The note is | The button then |
|---|---|---|
| Оформить (Prepare) | without `publish: true` | writes the front matter: `publish`, `title`, `description` |
| Опубликовать (Publish) | ready, but not on the server | sends the note and its images |
| Обновить (Update) | on the server, but changed | sends it again |
| Снять с публикации (Unpublish) | on the server and the same | removes it from the server, after you agree |
| Нет связи (No connection) | — | tries to reach the server again |

The same action is also a command in the palette and an item in the file menu. On a phone there is
no status bar, so use the command or the menu.

The plugin counts the same hash as the server. Because of this, the button knows if the note on the
server is the same as the note in the vault.

## Install

The plugin is not in the community catalog. Copy it into the vault:

1. Build it, or take `main.js` and `manifest.json` from a release.
2. Put both files into `<vault>/.obsidian/plugins/samizdat/`.
3. In Obsidian, open Settings → Community plugins, and turn on Samizdat.

Then open the plugin settings and write the address of your server and a token. You make the token
on the site: Settings → Tokens. The button «Проверить» (Check) tells you how many articles the
server has.

## Build

```bash
npm install
npm run build   # makes main.js
npm test        # 29 tests
```

## Limits

- The plugin sends one note — the open one. To send the full vault, or to remove the articles that
  are no longer in the vault, use the command line tool.
- If you rename a note, the address of the article changes, and the old article stays on the
  server.
- Two notes with the same title get the same address, and one of them overwrites the other.

## License

MIT. See [LICENSE](LICENSE).
