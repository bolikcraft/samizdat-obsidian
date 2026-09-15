/// Английский — база: тип Strings собирается из его ключей, поэтому словарь
/// другого языка без какого-то ключа не соберётся.
export const en = {
  'language.name': 'English',

  'state.draft': 'Prepare',
  'state.new': 'Publish',
  'state.changed': 'Update',
  'state.published': 'Unpublish',
  'state.offline': 'No connection',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: sending…',
  'status.unreadable': 'Samizdat: cannot read the note',

  'command.publish': 'Publish note',
  'command.check': 'Check the connection to the server',
  'menu.publish': 'Samizdat: publish',

  'notice.noSettings': 'Open the plugin settings: no address or token',
  'notice.offline': 'No connection to the server',
  'notice.unpublished': 'The article is unpublished',
  'notice.updated': 'The article is updated',
  'notice.published': 'The article is published',
  'notice.prepared': 'The note is ready. Click again to publish it',
  'confirm.unpublish': 'Unpublish “{name}”? Guest links to it will not work any more.',

  'settings.language.name': 'Language',
  'settings.language.desc': 'The names of the commands change only after a restart of Obsidian.',
  'settings.language.auto': 'Same as Obsidian',
  'settings.server.name': 'Server address',
  'settings.server.desc': 'For example http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Site settings → Tokens → make a new token',
  'settings.connection.name': 'Connection to the server',
  'settings.connection.button': 'Check',
  'settings.connection.ok': 'The connection works. Articles on the server: {count}',
  'settings.connection.fail': 'Failed: {error}',

  'error.offline': 'The server does not answer: {address}',
  'error.token': 'The token is not accepted',
  'error.status': 'The server answered {status}',
  'error.slugEmpty': 'the slug is empty',
  'error.slugSlash': 'the slug “{slug}” must not contain / or \\',
  'error.slugDots': 'the slug “{slug}” must not contain “..”',
  'error.slugDot': 'the slug “{slug}” must not start with a dot',
};

export type Strings = Record<keyof typeof en, string>;
