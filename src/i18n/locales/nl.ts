import type { Strings } from '../strings.ts';

export const nl: Strings = {
  'language.name': 'Nederlands',

  'state.draft': 'Voorbereiden',
  'state.new': 'Publiceren',
  'state.changed': 'Bijwerken',
  'state.published': 'Intrekken',
  'state.offline': 'Geen verbinding',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: verzenden…',
  'status.unreadable': 'Samizdat: notitie niet leesbaar',

  'command.publish': 'Notitie publiceren',
  'command.check': 'De verbinding met de server controleren',
  'menu.publish': 'Samizdat: publiceren',

  'notice.noSettings': 'Open de instellingen van de plug-in: geen adres of token',
  'notice.offline': 'Geen verbinding met de server',
  'notice.unpublished': 'Het artikel is ingetrokken',
  'notice.updated': 'Het artikel is bijgewerkt',
  'notice.published': 'Het artikel is gepubliceerd',
  'notice.prepared': 'De notitie is klaar. Klik nog een keer om die te publiceren',
  'confirm.unpublish': '“{name}” intrekken? Gastlinks daarheen werken dan niet meer.',

  'settings.language.name': 'Taal',
  'settings.language.desc': 'De namen van de opdrachten veranderen pas na een herstart van Obsidian.',
  'settings.language.auto': 'zoals in Obsidian',
  'settings.server.name': 'Serveradres',
  'settings.server.desc': 'Bijvoorbeeld http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Instellingen van de site → Tokens → een nieuw token maken',
  'settings.connection.name': 'Verbinding met de server',
  'settings.connection.button': 'Controleren',
  'settings.connection.ok': 'De verbinding werkt. Artikelen op de server: {count}',
  'settings.connection.fail': 'Mislukt: {error}',

  'error.offline': 'De server antwoordt niet: {address}',
  'error.token': 'Het token wordt niet geaccepteerd',
  'error.status': 'De server antwoordde {status}',
  'error.slugEmpty': 'de slug is leeg',
  'error.slugSlash': 'de slug “{slug}” mag geen / of \\ bevatten',
  'error.slugDots': 'de slug “{slug}” mag geen “..” bevatten',
  'error.slugDot': 'de slug “{slug}” mag niet met een punt beginnen',
  'error.slugControl': 'de slug “{slug}” mag geen stuurtekens bevatten',
  'error.slugQuery': 'de slug “{slug}” mag geen ?, # of % bevatten',
  'error.slugLong': 'de slug “{slug}” is langer dan {max} bytes in UTF-8',
};
