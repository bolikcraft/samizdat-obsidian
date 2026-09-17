import type { Strings } from '../strings.ts';

export const bg: Strings = {
  'language.name': 'Български',

  'state.draft': 'Подготви',
  'state.new': 'Публикувай',
  'state.changed': 'Обнови',
  'state.published': 'Спри публикуването',
  'state.offline': 'Няма връзка',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: изпращам…',
  'status.unreadable': 'Samizdat: бележката не се чете',

  'command.publish': 'Публикувай бележката',
  'command.check': 'Провери връзката със сървъра',
  'menu.publish': 'Samizdat: публикувай',

  'notice.noSettings': 'Отворете настройките на приставката: няма адрес или токен',
  'notice.offline': 'Няма връзка със сървъра',
  'notice.unpublished': 'Публикуването на статията е спряно',
  'notice.updated': 'Статията е обновена',
  'notice.published': 'Статията е публикувана',
  'notice.prepared': 'Бележката е готова. Натиснете отново, за да я публикувате',
  'confirm.unpublish': 'Да спре ли публикуването на „{name}“? Връзките за гости към нея вече няма да работят.',

  'settings.language.name': 'Език',
  'settings.language.desc': 'Имената на командите се променят само след рестарт на Obsidian.',
  'settings.language.auto': 'като в Obsidian',
  'settings.server.name': 'Адрес на сървъра',
  'settings.server.desc': 'Например http://127.0.0.1:5080',
  'settings.token.name': 'Токен',
  'settings.token.desc': 'Настройки на сайта → Токени → направете нов токен',
  'settings.connection.name': 'Връзка със сървъра',
  'settings.connection.button': 'Провери',
  'settings.connection.ok': 'Връзката работи. Статии на сървъра: {count}',
  'settings.connection.fail': 'Не се получи: {error}',

  'error.offline': 'Сървърът не отговаря: {address}',
  'error.token': 'Токенът не е приет',
  'error.status': 'Сървърът отговори {status}',
  'error.slugEmpty': 'празен slug',
  'error.slugSlash': 'slug „{slug}“ не трябва да съдържа / или \\',
  'error.slugDots': 'slug „{slug}“ не трябва да съдържа „..“',
  'error.slugDot': 'slug „{slug}“ не трябва да започва с точка',
  'error.slugControl': 'slug „{slug}“ не трябва да съдържа управляващи символи',
  'error.slugQuery': 'slug „{slug}“ не трябва да съдържа ?, # или %',
  'error.slugLong': 'slug „{slug}“ е по-дълъг от {max} байта в UTF-8',
};
