import type { Strings } from '../strings.ts';

export const zhHant: Strings = {
  'language.name': '繁體中文',

  'state.draft': '準備',
  'state.new': '發佈',
  'state.changed': '更新',
  'state.published': '取消發佈',
  'state.offline': '未連線',

  'status.label': 'Samizdat：{label}',
  'status.busy': 'Samizdat：正在傳送…',
  'status.unreadable': 'Samizdat：無法讀取筆記',

  'command.publish': '發佈筆記',
  'command.check': '檢查與伺服器的連線',
  'menu.publish': 'Samizdat：發佈',

  'notice.noSettings': '請開啟外掛設定：還沒有位址或權杖',
  'notice.offline': '無法連線到伺服器',
  'notice.unpublished': '文章已取消發佈',
  'notice.updated': '文章已更新',
  'notice.published': '文章已發佈',
  'notice.prepared': '筆記已準備好。再點一次就能發佈',
  'notice.attachmentSkipped': '這些附件未傳送，伺服器不接受這樣的名稱：{names}',
  'confirm.unpublish': '取消發佈「{name}」？訪客連結將不再有效。',

  'settings.language.name': '語言',
  'settings.language.desc': '指令的名稱要重新啟動 Obsidian 之後才會改變。',
  'settings.language.auto': '與 Obsidian 相同',
  'settings.server.name': '伺服器位址',
  'settings.server.desc': '例如 http://127.0.0.1:5080',
  'settings.token.name': '權杖',
  'settings.token.desc': '網站設定 → 權杖 → 建立新的權杖',
  'settings.connection.name': '與伺服器的連線',
  'settings.connection.button': '檢查',
  'settings.connection.ok': '連線正常。伺服器上的文章：{count}',
  'settings.connection.fail': '失敗：{error}',

  'error.offline': '伺服器沒有回應：{address}',
  'error.token': '權杖沒有被接受',
  'error.status': '伺服器回應 {status}',
  'error.slugEmpty': 'slug 是空的',
  'error.slugSlash': 'slug「{slug}」不能包含 / 或 \\',
  'error.slugDots': 'slug「{slug}」不能包含「..」',
  'error.slugDot': 'slug「{slug}」不能以點開頭',
  'error.slugControl': 'slug「{slug}」不能包含控制字元',
  'error.slugQuery': 'slug「{slug}」不能包含 ?、# 或 %',
  'error.slugLong': 'slug「{slug}」在 UTF-8 中超過 {max} 位元組',
};
