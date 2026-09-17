import type { Strings } from '../strings.ts';

export const es: Strings = {
  'language.name': 'Español',

  'state.draft': 'Preparar',
  'state.new': 'Publicar',
  'state.changed': 'Actualizar',
  'state.published': 'Retirar',
  'state.offline': 'Sin conexión',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: enviando…',
  'status.unreadable': 'Samizdat: no se puede leer la nota',

  'command.publish': 'Publicar la nota',
  'command.check': 'Comprobar la conexión con el servidor',
  'menu.publish': 'Samizdat: publicar',

  'notice.noSettings': 'Abre los ajustes del plugin: falta la dirección o el token',
  'notice.offline': 'Sin conexión con el servidor',
  'notice.unpublished': 'El artículo está retirado',
  'notice.updated': 'El artículo está actualizado',
  'notice.published': 'El artículo está publicado',
  'notice.prepared': 'La nota está lista. Pulsa otra vez para publicarla',
  'confirm.unpublish': '¿Retirar «{name}»? Los enlaces de invitado dejarán de funcionar.',

  'settings.language.name': 'Idioma',
  'settings.language.desc': 'Los nombres de los comandos cambian solo después de reiniciar Obsidian.',
  'settings.language.auto': 'igual que Obsidian',
  'settings.server.name': 'Dirección del servidor',
  'settings.server.desc': 'Por ejemplo http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Ajustes del sitio → Tokens → crear un token nuevo',
  'settings.connection.name': 'Conexión con el servidor',
  'settings.connection.button': 'Comprobar',
  'settings.connection.ok': 'La conexión funciona. Artículos en el servidor: {count}',
  'settings.connection.fail': 'Ha fallado: {error}',

  'error.offline': 'El servidor no responde: {address}',
  'error.token': 'El token no se acepta',
  'error.status': 'El servidor respondió {status}',
  'error.slugEmpty': 'el slug está vacío',
  'error.slugSlash': 'el slug «{slug}» no debe contener / ni \\',
  'error.slugDots': 'el slug «{slug}» no debe contener «..»',
  'error.slugDot': 'el slug «{slug}» no debe empezar por un punto',
  'error.slugControl': 'el slug «{slug}» no debe contener caracteres de control',
  'error.slugQuery': 'el slug «{slug}» no debe contener ?, # ni %',
  'error.slugLong': 'el slug «{slug}» ocupa más de {max} bytes en UTF-8',
};
