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

## What you need

- Obsidian 1.5.8 or later, on a computer or on a phone.
- A [Samizdat](https://github.com/bolikcraft/samizdat) server that you can open from this device,
  and a token from it.

## Install

The plugin is not in the community catalog of Obsidian. Install it with BRAT — a plugin that takes
other plugins from GitHub and keeps them up to date.

**First, install BRAT:**

1. In Obsidian, open Settings → Community plugins. If the restricted mode is on, turn it off.
2. Click Browse, find **BRAT** (the full name is "Obsidian42 - BRAT"), install it, and turn it on.

**Then, install this plugin:**

3. Open the command palette (`Ctrl+P`, on a Mac `Cmd+P`) and run
   **BRAT: Plugins: Add a beta plugin for testing (with or without version)**.
4. In the field for the repository, write `bolikcraft/samizdat-obsidian`.
5. Keep the field for the version empty — BRAT then takes the last release.
6. Keep "Enable after installing the plugin" on, and click **Add plugin**.

Samizdat is now in Settings → Community plugins, and the button is in the status bar.

**New versions:** BRAT looks for them when Obsidian starts. To look now, run
**BRAT: Plugins: Check for updates to all beta plugins and UPDATE**.

**Without BRAT:** take `main.js` and `manifest.json` from a
[release](https://github.com/bolikcraft/samizdat-obsidian/releases), put both into
`<vault>/.obsidian/plugins/samizdat/`, restart Obsidian, and turn the plugin on in
Settings → Community plugins. Then you must install each new version by hand.

## Setup

Open Settings → Samizdat and fill in two fields:

- **Server address** — for example `https://samizdat.example.com` or `http://127.0.0.1:5080`.
- **Token** — you make it on the site: Settings → Tokens → make a new token.

Then click **Check**. It tells you how many articles the server has. If it says that the server
does not answer, look at the address; if it says that the token is wrong, make a new token.

## Your first article

1. Open the note that you want on the site.
2. Click the button in the status bar. It says **Prepare**: the plugin writes `publish`, `title`
   and `description` into the front matter of the note.
3. Look at the front matter, and change the title and the description if you want.
4. Click the button again — it now says **Publish**. The plugin sends the note and its images.
5. The article is on the site. Later, when you change the note, the button says **Update**.

To remove the article, click the button when it says **Unpublish**, and agree.

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

The same action is also a command in the palette ("Samizdat: Publish note") and an item in the
menu of the file. On a phone there is no status bar, so use the command or the menu.

The plugin counts the same hash as the server. Because of this, the button knows if the note on the
server is the same as the note in the vault.

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
