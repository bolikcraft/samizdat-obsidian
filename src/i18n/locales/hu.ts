import type { Strings } from '../strings.ts';

export const hu: Strings = {
  'language.name': 'Magyar',

  'state.draft': 'Előkészítés',
  'state.new': 'Közzététel',
  'state.changed': 'Frissítés',
  'state.published': 'Visszavonás',
  'state.offline': 'Nincs kapcsolat',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: küldés…',
  'status.unreadable': 'Samizdat: a jegyzet nem olvasható',

  'command.publish': 'Jegyzet közzététele',
  'command.check': 'Kapcsolat ellenőrzése a szerverrel',
  'menu.publish': 'Samizdat: közzététel',

  'notice.noSettings': 'Nyisd meg a bővítmény beállításait: nincs cím vagy token',
  'notice.offline': 'Nincs kapcsolat a szerverrel',
  'notice.unpublished': 'A cikk visszavonva',
  'notice.updated': 'A cikk frissítve',
  'notice.published': 'A cikk közzétéve',
  'notice.prepared': 'A jegyzet kész. Kattints újra a közzétételhez',
  'confirm.unpublish': 'Visszavonod ezt: „{name}”? A vendégeknek adott linkek ezután nem működnek.',

  'settings.language.name': 'Nyelv',
  'settings.language.desc': 'A parancsok nevei csak az Obsidian újraindítása után változnak meg.',
  'settings.language.auto': 'mint az Obsidianban',
  'settings.server.name': 'Szerver címe',
  'settings.server.desc': 'Például http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Webhely beállításai → Tokenek → új token készítése',
  'settings.connection.name': 'Kapcsolat a szerverrel',
  'settings.connection.button': 'Ellenőrzés',
  'settings.connection.ok': 'A kapcsolat működik. Cikkek a szerveren: {count}',
  'settings.connection.fail': 'Nem sikerült: {error}',

  'error.offline': 'A szerver nem válaszol: {address}',
  'error.token': 'A szerver nem fogadja el a tokent',
  'error.status': 'A szerver válasza: {status}',
  'error.slugEmpty': 'a slug üres',
  'error.slugSlash': 'a slug nem tartalmazhat / vagy \\ jelet: „{slug}”',
  'error.slugDots': 'a slug nem tartalmazhat „..” jelet: „{slug}”',
  'error.slugDot': 'a slug nem kezdődhet ponttal: „{slug}”',
};
