import type { Strings } from '../strings.ts';

export const fr: Strings = {
  'language.name': 'Français',

  'state.draft': 'Préparer',
  'state.new': 'Publier',
  'state.changed': 'Mettre à jour',
  'state.published': 'Retirer',
  'state.offline': 'Pas de connexion',

  'status.label': 'Samizdat : {label}',
  'status.busy': 'Samizdat : envoi…',
  'status.unreadable': 'Samizdat : lecture de la note impossible',

  'command.publish': 'Publier la note',
  'command.check': 'Vérifier la connexion au serveur',
  'menu.publish': 'Samizdat : publier',

  'notice.noSettings': 'Ouvrez les paramètres du plugin : pas d’adresse ni de jeton',
  'notice.offline': 'Pas de connexion au serveur',
  'notice.unpublished': 'L’article est retiré',
  'notice.updated': 'L’article est mis à jour',
  'notice.published': 'L’article est publié',
  'notice.prepared': 'La note est prête. Cliquez encore une fois pour la publier',
  'confirm.unpublish': 'Retirer « {name} » ? Les liens invités ne marcheront plus.',

  'settings.language.name': 'Langue',
  'settings.language.desc': 'Les noms des commandes changent seulement après un redémarrage d’Obsidian.',
  'settings.language.auto': 'comme Obsidian',
  'settings.server.name': 'Adresse du serveur',
  'settings.server.desc': 'Par exemple http://127.0.0.1:5080',
  'settings.token.name': 'Jeton',
  'settings.token.desc': 'Paramètres du site → Jetons → faire un jeton',
  'settings.connection.name': 'Connexion au serveur',
  'settings.connection.button': 'Vérifier',
  'settings.connection.ok': 'La connexion marche. Articles sur le serveur : {count}',
  'settings.connection.fail': 'Échec : {error}',

  'error.offline': 'Le serveur ne répond pas : {address}',
  'error.token': 'Le jeton n’est pas accepté',
  'error.status': 'Le serveur a répondu {status}',
  'error.slugEmpty': 'le slug est vide',
  'error.slugSlash': 'le slug « {slug} » ne doit pas contenir / ni \\',
  'error.slugDots': 'le slug « {slug} » ne doit pas contenir « .. »',
  'error.slugDot': 'le slug « {slug} » ne doit pas commencer par un point',
};
