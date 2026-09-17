import type { Strings } from '../strings.ts';

export const ptBR: Strings = {
  'language.name': 'Português (Brasil)',

  'state.draft': 'Preparar',
  'state.new': 'Publicar',
  'state.changed': 'Atualizar',
  'state.published': 'Despublicar',
  'state.offline': 'Sem conexão',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: enviando…',
  'status.unreadable': 'Samizdat: não dá para ler a nota',

  'command.publish': 'Publicar a nota',
  'command.check': 'Verificar a conexão com o servidor',
  'menu.publish': 'Samizdat: publicar',

  'notice.noSettings': 'Abra as configurações do plugin: falta o endereço ou o token',
  'notice.offline': 'Sem conexão com o servidor',
  'notice.unpublished': 'O artigo está despublicado',
  'notice.updated': 'O artigo está atualizado',
  'notice.published': 'O artigo está publicado',
  'notice.prepared': 'A nota está pronta. Clique de novo para publicá-la',
  'confirm.unpublish': 'Despublicar “{name}”? Os links de convidado vão parar de funcionar.',

  'settings.language.name': 'Idioma',
  'settings.language.desc': 'Os nomes dos comandos mudam só depois de reiniciar o Obsidian.',
  'settings.language.auto': 'igual ao Obsidian',
  'settings.server.name': 'Endereço do servidor',
  'settings.server.desc': 'Por exemplo http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Configurações do site → Tokens → fazer um token novo',
  'settings.connection.name': 'Conexão com o servidor',
  'settings.connection.button': 'Verificar',
  'settings.connection.ok': 'A conexão funciona. Artigos no servidor: {count}',
  'settings.connection.fail': 'Falhou: {error}',

  'error.offline': 'O servidor não responde: {address}',
  'error.token': 'O token não foi aceito',
  'error.status': 'O servidor respondeu {status}',
  'error.slugEmpty': 'o slug está vazio',
  'error.slugSlash': 'o slug “{slug}” não pode conter / nem \\',
  'error.slugDots': 'o slug “{slug}” não pode conter “..”',
  'error.slugDot': 'o slug “{slug}” não pode começar com ponto',
  'error.slugControl': 'o slug “{slug}” não pode conter caracteres de controle',
  'error.slugQuery': 'o slug “{slug}” não pode conter ?, # nem %',
  'error.slugLong': 'o slug “{slug}” tem mais de {max} bytes em UTF-8',
};
