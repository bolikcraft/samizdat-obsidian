import type { Strings } from '../strings.ts';

export const ja: Strings = {
  'language.name': '日本語',

  'state.draft': '準備',
  'state.new': '公開',
  'state.changed': '更新',
  'state.published': '公開停止',
  'state.offline': '接続なし',

  'status.label': 'Samizdat：{label}',
  'status.busy': 'Samizdat：送信中…',
  'status.unreadable': 'Samizdat：ノートを読めません',

  'command.publish': 'ノートを公開',
  'command.check': 'サーバーとの接続を確認',
  'menu.publish': 'Samizdat：公開',

  'notice.noSettings': 'プラグインの設定を開いてください：アドレスかトークンがありません',
  'notice.offline': 'サーバーとの接続がありません',
  'notice.unpublished': '記事の公開を停止しました',
  'notice.updated': '記事を更新しました',
  'notice.published': '記事を公開しました',
  'notice.prepared': 'ノートの準備ができました。もう一度押すと公開します',
  'confirm.unpublish': '「{name}」の公開を停止しますか？ゲストリンクはもう使えなくなります。',

  'settings.language.name': '言語',
  'settings.language.desc': 'コマンドの名前は Obsidian を再起動してから変わります。',
  'settings.language.auto': 'Obsidian と同じ',
  'settings.server.name': 'サーバーのアドレス',
  'settings.server.desc': '例：http://127.0.0.1:5080',
  'settings.token.name': 'トークン',
  'settings.token.desc': 'サイトの設定 → トークン → 新しいトークンを作る',
  'settings.connection.name': 'サーバーとの接続',
  'settings.connection.button': '確認',
  'settings.connection.ok': '接続できました。サーバーの記事：{count}',
  'settings.connection.fail': '失敗しました：{error}',

  'error.offline': 'サーバーが応答しません：{address}',
  'error.token': 'トークンが受け付けられません',
  'error.status': 'サーバーが {status} を返しました',
  'error.slugEmpty': 'slug が空です',
  'error.slugSlash': 'slug「{slug}」に / や \\ は使えません',
  'error.slugDots': 'slug「{slug}」に「..」は使えません',
  'error.slugDot': 'slug「{slug}」の先頭にドットは使えません',
};
