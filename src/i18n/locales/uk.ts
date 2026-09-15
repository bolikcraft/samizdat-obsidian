import type { Strings } from '../strings.ts';

export const uk: Strings = {
  'language.name': 'Українська',

  'state.draft': 'Оформити',
  'state.new': 'Опублікувати',
  'state.changed': 'Оновити',
  'state.published': 'Зняти з публікації',
  'state.offline': 'Немає зв’язку',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: надсилаю…',
  'status.unreadable': 'Samizdat: не вдалося прочитати нотатку',

  'command.publish': 'Опублікувати нотатку',
  'command.check': 'Перевірити зв’язок із сервером',
  'menu.publish': 'Samizdat: опублікувати',

  'notice.noSettings': 'Відкрийте налаштування плагіна: немає адреси або токена',
  'notice.offline': 'Немає зв’язку із сервером',
  'notice.unpublished': 'Статтю знято з публікації',
  'notice.updated': 'Статтю оновлено',
  'notice.published': 'Статтю опубліковано',
  'notice.prepared': 'Нотатку оформлено. Натисніть ще раз, щоб опублікувати',
  'confirm.unpublish': 'Зняти «{name}» з публікації? Гостьові посилання на неї перестануть працювати.',

  'settings.language.name': 'Мова',
  'settings.language.desc': 'Назви команд змінюються лише після перезапуску Obsidian.',
  'settings.language.auto': 'як в Obsidian',
  'settings.server.name': 'Адреса сервера',
  'settings.server.desc': 'Наприклад http://127.0.0.1:5080',
  'settings.token.name': 'Токен',
  'settings.token.desc': 'Налаштування сайту → Токени → зробити новий токен',
  'settings.connection.name': 'Зв’язок із сервером',
  'settings.connection.button': 'Перевірити',
  'settings.connection.ok': 'Зв’язок є. Статей на сервері: {count}',
  'settings.connection.fail': 'Не вийшло: {error}',

  'error.offline': 'Сервер не відповідає: {address}',
  'error.token': 'Токен не підійшов',
  'error.status': 'Сервер відповів {status}',
  'error.slugEmpty': 'порожній slug',
  'error.slugSlash': 'slug «{slug}» не повинен містити / або \\',
  'error.slugDots': 'slug «{slug}» не повинен містити «..»',
  'error.slugDot': 'slug «{slug}» не повинен починатися з крапки',
};
