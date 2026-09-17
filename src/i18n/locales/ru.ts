import type { Strings } from '../strings.ts';

export const ru: Strings = {
  'language.name': 'Русский',

  'state.draft': 'Оформить',
  'state.new': 'Опубликовать',
  'state.changed': 'Обновить',
  'state.published': 'Снять с публикации',
  'state.offline': 'Нет связи',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: отправляю…',
  'status.unreadable': 'Samizdat: не удалось прочитать заметку',

  'command.publish': 'Опубликовать заметку',
  'command.check': 'Проверить связь с сервером',
  'menu.publish': 'Samizdat: опубликовать',

  'notice.noSettings': 'Откройте настройки плагина: нет адреса или токена',
  'notice.offline': 'Нет связи с сервером',
  'notice.unpublished': 'Статья снята с публикации',
  'notice.updated': 'Статья обновлена',
  'notice.published': 'Статья опубликована',
  'notice.prepared': 'Заметка оформлена. Нажмите ещё раз, чтобы опубликовать',
  'confirm.unpublish': 'Снять «{name}» с публикации? Гостевые ссылки на неё перестанут работать.',

  'settings.language.name': 'Язык',
  'settings.language.desc': 'Имена команд в палитре меняются только после перезапуска Obsidian.',
  'settings.language.auto': 'как в Obsidian',
  'settings.server.name': 'Адрес сервера',
  'settings.server.desc': 'Например http://127.0.0.1:5080',
  'settings.token.name': 'Токен',
  'settings.token.desc': 'Настройки сайта → Токены → выпустить новый',
  'settings.connection.name': 'Связь с сервером',
  'settings.connection.button': 'Проверить',
  'settings.connection.ok': 'Связь есть. Статей на сервере: {count}',
  'settings.connection.fail': 'Не вышло: {error}',

  'error.offline': 'Сервер не отвечает: {address}',
  'error.token': 'Токен не подошёл',
  'error.status': 'Сервер ответил {status}',
  'error.slugEmpty': 'пустой slug',
  'error.slugSlash': 'slug «{slug}» не должен содержать / или \\',
  'error.slugDots': 'slug «{slug}» не должен содержать «..»',
  'error.slugDot': 'slug «{slug}» не должен начинаться с точки',
  'error.slugControl': 'slug «{slug}» не должен содержать управляющие символы',
  'error.slugQuery': 'slug «{slug}» не должен содержать ?, # и %',
  'error.slugLong': 'slug «{slug}» длиннее {max} байт в UTF-8',
};
