import type { Strings } from '../strings.ts';

export const cs: Strings = {
  'language.name': 'Čeština',

  'state.draft': 'Připravit',
  'state.new': 'Publikovat',
  'state.changed': 'Aktualizovat',
  'state.published': 'Zrušit publikaci',
  'state.offline': 'Bez spojení',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: odesílám…',
  'status.unreadable': 'Samizdat: poznámku nelze přečíst',

  'command.publish': 'Publikovat poznámku',
  'command.check': 'Zkontrolovat spojení se serverem',
  'menu.publish': 'Samizdat: publikovat',

  'notice.noSettings': 'Otevřete nastavení pluginu: chybí adresa nebo token',
  'notice.offline': 'Bez spojení se serverem',
  'notice.unpublished': 'Publikace článku je zrušena',
  'notice.updated': 'Článek je aktualizován',
  'notice.published': 'Článek je publikován',
  'notice.prepared': 'Poznámka je připravena. Klikněte znovu a publikujte ji',
  'notice.attachmentSkipped': 'Tyto přílohy nebyly odeslány, server takové názvy nepřijímá: {names}',
  'confirm.unpublish': 'Zrušit publikaci „{name}“? Odkazy pro hosty na ni přestanou fungovat.',

  'settings.language.name': 'Jazyk',
  'settings.language.desc': 'Názvy příkazů se změní až po restartu Obsidianu.',
  'settings.language.auto': 'jako v Obsidianu',
  'settings.server.name': 'Adresa serveru',
  'settings.server.desc': 'Například http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Nastavení webu → Tokeny → vytvořte nový token',
  'settings.connection.name': 'Spojení se serverem',
  'settings.connection.button': 'Zkontrolovat',
  'settings.connection.ok': 'Spojení funguje. Článků na serveru: {count}',
  'settings.connection.fail': 'Nepovedlo se: {error}',

  'error.offline': 'Server neodpovídá: {address}',
  'error.token': 'Token nebyl přijat',
  'error.status': 'Server odpověděl {status}',
  'error.slugEmpty': 'slug je prázdný',
  'error.slugSlash': 'slug „{slug}“ nesmí obsahovat / ani \\',
  'error.slugDots': 'slug „{slug}“ nesmí obsahovat „..“',
  'error.slugDot': 'slug „{slug}“ nesmí začínat tečkou',
  'error.slugControl': 'slug „{slug}“ nesmí obsahovat řídicí znaky',
  'error.slugQuery': 'slug „{slug}“ nesmí obsahovat ?, # ani %',
  'error.slugLong': 'slug „{slug}“ je delší než {max} bajtů v UTF-8',
};
