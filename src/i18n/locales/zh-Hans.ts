import type { Strings } from '../strings.ts';

export const zhHans: Strings = {
  'language.name': '简体中文',

  'state.draft': '准备',
  'state.new': '发布',
  'state.changed': '更新',
  'state.published': '取消发布',
  'state.offline': '没有连接',

  'status.label': 'Samizdat：{label}',
  'status.busy': 'Samizdat：正在发送…',
  'status.unreadable': 'Samizdat：无法读取笔记',

  'command.publish': '发布笔记',
  'command.check': '检查与服务器的连接',
  'menu.publish': 'Samizdat：发布',

  'notice.noSettings': '请打开插件设置：还没有地址或令牌',
  'notice.offline': '没有与服务器的连接',
  'notice.unpublished': '文章已取消发布',
  'notice.updated': '文章已更新',
  'notice.published': '文章已发布',
  'notice.prepared': '笔记已准备好。再点一次就能发布',
  'confirm.unpublish': '取消发布“{name}”？访客链接将不再有效。',

  'settings.language.name': '语言',
  'settings.language.desc': '命令的名称在重启 Obsidian 之后才会改变。',
  'settings.language.auto': '与 Obsidian 相同',
  'settings.server.name': '服务器地址',
  'settings.server.desc': '例如 http://127.0.0.1:5080',
  'settings.token.name': '令牌',
  'settings.token.desc': '站点设置 → 令牌 → 做一个新令牌',
  'settings.connection.name': '与服务器的连接',
  'settings.connection.button': '检查',
  'settings.connection.ok': '连接正常。服务器上的文章：{count}',
  'settings.connection.fail': '失败：{error}',

  'error.offline': '服务器没有回答：{address}',
  'error.token': '令牌没有被接受',
  'error.status': '服务器回答 {status}',
  'error.slugEmpty': 'slug 是空的',
  'error.slugSlash': 'slug“{slug}”不能包含 / 或 \\',
  'error.slugDots': 'slug“{slug}”不能包含“..”',
  'error.slugDot': 'slug“{slug}”不能以点开头',
  'error.slugControl': 'slug“{slug}”不能包含控制字符',
  'error.slugQuery': 'slug“{slug}”不能包含 ?、# 或 %',
  'error.slugLong': 'slug“{slug}”在 UTF-8 中超过 {max} 字节',
};
