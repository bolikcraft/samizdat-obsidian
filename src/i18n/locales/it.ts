import type { Strings } from '../strings.ts';

export const it: Strings = {
  'language.name': 'Italiano',

  'state.draft': 'Prepara',
  'state.new': 'Pubblica',
  'state.changed': 'Aggiorna',
  'state.published': 'Ritira',
  'state.offline': 'Nessuna connessione',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: invio…',
  'status.unreadable': 'Samizdat: nota illeggibile',

  'command.publish': 'Pubblica la nota',
  'command.check': 'Controlla la connessione al server',
  'menu.publish': 'Samizdat: pubblica',

  'notice.noSettings': 'Apri le impostazioni del plugin: manca l’indirizzo o il token',
  'notice.offline': 'Nessuna connessione al server',
  'notice.unpublished': 'L’articolo è ritirato',
  'notice.updated': 'L’articolo è aggiornato',
  'notice.published': 'L’articolo è pubblicato',
  'notice.prepared': 'La nota è pronta. Fai clic di nuovo per pubblicarla',
  'notice.attachmentSkipped': 'Questi allegati non vengono inviati, il server non accetta questi nomi: {names}',
  'confirm.unpublish': 'Ritirare «{name}»? I link per gli ospiti non funzioneranno più.',

  'settings.language.name': 'Lingua',
  'settings.language.desc': 'I nomi dei comandi cambiano solo dopo il riavvio di Obsidian.',
  'settings.language.auto': 'come in Obsidian',
  'settings.server.name': 'Indirizzo del server',
  'settings.server.desc': 'Per esempio http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Impostazioni del sito → Token → fai un token nuovo',
  'settings.connection.name': 'Connessione al server',
  'settings.connection.button': 'Controlla',
  'settings.connection.ok': 'La connessione funziona. Articoli sul server: {count}',
  'settings.connection.fail': 'Non riuscito: {error}',

  'error.offline': 'Il server non risponde: {address}',
  'error.token': 'Il token non è accettato',
  'error.status': 'Il server ha risposto {status}',
  'error.slugEmpty': 'lo slug è vuoto',
  'error.slugSlash': 'lo slug «{slug}» non deve contenere / o \\',
  'error.slugDots': 'lo slug «{slug}» non deve contenere «..»',
  'error.slugDot': 'lo slug «{slug}» non deve iniziare con un punto',
  'error.slugControl': 'lo slug «{slug}» non deve contenere caratteri di controllo',
  'error.slugQuery': 'lo slug «{slug}» non deve contenere ?, # o %',
  'error.slugLong': 'lo slug «{slug}» supera {max} byte in UTF-8',
};
