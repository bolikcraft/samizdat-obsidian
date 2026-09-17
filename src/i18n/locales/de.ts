import type { Strings } from '../strings.ts';

export const de: Strings = {
  'language.name': 'Deutsch',

  'state.draft': 'Vorbereiten',
  'state.new': 'Veröffentlichen',
  'state.changed': 'Aktualisieren',
  'state.published': 'Zurückziehen',
  'state.offline': 'Keine Verbindung',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: sendet…',
  'status.unreadable': 'Samizdat: Notiz nicht lesbar',

  'command.publish': 'Notiz veröffentlichen',
  'command.check': 'Verbindung zum Server prüfen',
  'menu.publish': 'Samizdat: veröffentlichen',

  'notice.noSettings': 'Öffne die Einstellungen des Plugins: keine Adresse oder kein Token',
  'notice.offline': 'Keine Verbindung zum Server',
  'notice.unpublished': 'Der Artikel ist zurückgezogen',
  'notice.updated': 'Der Artikel ist aktualisiert',
  'notice.published': 'Der Artikel ist veröffentlicht',
  'notice.prepared': 'Die Notiz ist fertig. Klicke noch einmal, um sie zu veröffentlichen',
  'notice.attachmentSkipped': 'Diese Anhänge werden nicht gesendet, der Server nimmt solche Namen nicht an: {names}',
  'confirm.unpublish': '„{name}“ zurückziehen? Gastlinks dorthin funktionieren dann nicht mehr.',

  'settings.language.name': 'Sprache',
  'settings.language.desc': 'Die Namen der Befehle ändern sich erst nach einem Neustart von Obsidian.',
  'settings.language.auto': 'wie in Obsidian',
  'settings.server.name': 'Serveradresse',
  'settings.server.desc': 'Zum Beispiel http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Einstellungen der Website → Tokens → ein neues Token machen',
  'settings.connection.name': 'Verbindung zum Server',
  'settings.connection.button': 'Prüfen',
  'settings.connection.ok': 'Die Verbindung steht. Artikel auf dem Server: {count}',
  'settings.connection.fail': 'Fehlgeschlagen: {error}',

  'error.offline': 'Der Server antwortet nicht: {address}',
  'error.token': 'Das Token wird nicht angenommen',
  'error.status': 'Der Server antwortete {status}',
  'error.slugEmpty': 'der Slug ist leer',
  'error.slugSlash': 'der Slug „{slug}“ darf kein / und kein \\ enthalten',
  'error.slugDots': 'der Slug „{slug}“ darf kein „..“ enthalten',
  'error.slugDot': 'der Slug „{slug}“ darf nicht mit einem Punkt beginnen',
  'error.slugControl': 'der Slug „{slug}“ darf keine Steuerzeichen enthalten',
  'error.slugQuery': 'der Slug „{slug}“ darf kein ?, # und kein % enthalten',
  'error.slugLong': 'der Slug „{slug}“ ist länger als {max} Bytes in UTF-8',
};
