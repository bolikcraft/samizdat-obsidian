import type { Strings } from '../strings.ts';

export const be: Strings = {
  'language.name': 'Беларуская',

  'state.draft': 'Аформіць',
  'state.new': 'Апублікаваць',
  'state.changed': 'Абнавіць',
  'state.published': 'Зняць з публікацыі',
  'state.offline': 'Няма сувязі',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: дасылаю…',
  'status.unreadable': 'Samizdat: не ўдалося прачытаць нататку',

  'command.publish': 'Апублікаваць нататку',
  'command.check': 'Праверыць сувязь з серверам',
  'menu.publish': 'Samizdat: апублікаваць',

  'notice.noSettings': 'Адкрыйце налады плагіна: няма адраса або токена',
  'notice.offline': 'Няма сувязі з серверам',
  'notice.unpublished': 'Артыкул зняты з публікацыі',
  'notice.updated': 'Артыкул абноўлены',
  'notice.published': 'Артыкул апублікаваны',
  'notice.prepared': 'Нататка аформлена. Націсніце яшчэ раз, каб апублікаваць',
  'notice.attachmentSkipped': 'Гэтыя ўкладанні не адпраўлены, сервер не прымае такія назвы: {names}',
  'confirm.unpublish': 'Зняць «{name}» з публікацыі? Гасцявыя спасылкі на артыкул перастануць працаваць.',

  'settings.language.name': 'Мова',
  'settings.language.desc': 'Назвы каманд мяняюцца толькі пасля перазапуску Obsidian.',
  'settings.language.auto': 'як у Obsidian',
  'settings.server.name': 'Адрас сервера',
  'settings.server.desc': 'Напрыклад http://127.0.0.1:5080',
  'settings.token.name': 'Токен',
  'settings.token.desc': 'Налады сайта → Токены → зрабіць новы токен',
  'settings.connection.name': 'Сувязь з серверам',
  'settings.connection.button': 'Праверыць',
  'settings.connection.ok': 'Сувязь ёсць. Артыкулаў на серверы: {count}',
  'settings.connection.fail': 'Не выйшла: {error}',

  'error.offline': 'Сервер не адказвае: {address}',
  'error.token': 'Токен не падышоў',
  'error.status': 'Сервер адказаў {status}',
  'error.slugEmpty': 'пусты slug',
  'error.slugSlash': 'slug «{slug}» не павінен утрымліваць / або \\',
  'error.slugDots': 'slug «{slug}» не павінен утрымліваць «..»',
  'error.slugDot': 'slug «{slug}» не павінен пачынацца з кропкі',
  'error.slugControl': 'slug «{slug}» не павінен утрымліваць кіравальныя сімвалы',
  'error.slugQuery': 'slug «{slug}» не павінен утрымліваць ?, # або %',
  'error.slugLong': 'slug «{slug}» даўжэйшы за {max} байтаў у UTF-8',
};
