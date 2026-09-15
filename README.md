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

The button sits in the status bar at the bottom right. It shows the state of the open note (the
names below are the English ones):

| The button says | The note is | The button then |
|---|---|---|
| Prepare | without `publish: true` | writes the front matter: `publish`, `title`, `description` |
| Publish | ready, but not on the server | sends the note and its images |
| Update | on the server, but changed | sends it again |
| Unpublish | on the server and the same | removes it from the server, after you agree |
| No connection | — | tries to reach the server again |

The same action is also a command in the palette and an item in the file menu. On a phone there is
no status bar, so use the command or the menu.

The plugin counts the same hash as the server. Because of this, the button knows if the note on the
server is the same as the note in the vault.

## Install

The plugin is not in the community catalog. Use BRAT, which installs a plugin from GitHub and
keeps it up to date:

1. In Obsidian, install the plugin **BRAT** from the catalog, and turn it on.
2. Run the command "BRAT: Add a beta plugin for testing".
3. Write `bolikcraft/samizdat-obsidian`, keep "Latest version", and add the plugin.
4. In Settings → Community plugins, turn on Samizdat.

To get a new version later, run "BRAT: Check for updates to all beta plugins", or let BRAT do it
at start.

You can also copy the files by hand: take `main.js` and `manifest.json` from a
[release](https://github.com/bolikcraft/samizdat-obsidian/releases), put both into
`<vault>/.obsidian/plugins/samizdat/`, and turn the plugin on.

Then open the plugin settings and write the address of your server and a token. You make the token
on the site: Settings → Tokens. The button "Check" tells you how many articles the server has.

## Language

The plugin speaks the language of Obsidian. It knows 12 languages:

English, Deutsch, Español, Français, Bahasa Indonesia, Italiano, Polski, Português (Brasil),
Русский, Türkçe, Українська, 简体中文.

If Obsidian speaks a different language, the plugin shows English. To select a language yourself,
use the first item in the plugin settings. The names of the commands in the palette change only
after a restart of Obsidian.

To add a language, copy `src/i18n/strings.ts` into `src/i18n/locales/<code>.ts`, translate the
values, and add the file to `LOCALES` in `src/i18n/index.ts`. The type `Strings` does not let a
translation forget a key.

## Build

```bash
npm install
npm run build   # makes main.js
npm test        # 43 tests
```

## Release

```bash
npm version patch          # writes manifest.json and versions.json
git push --follow-tags     # the tag starts the build and makes the release
```

GitHub Actions builds the plugin and puts `main.js` and `manifest.json` into the release. BRAT
takes the files from there.

## Limits

- The plugin sends one note — the open one. To send the full vault, or to remove the articles that
  are no longer in the vault, use the command line tool.
- If you rename a note, the address of the article changes, and the old article stays on the
  server.
- Two notes with the same title get the same address, and one of them overwrites the other.

## License

MIT. See [LICENSE](LICENSE).
