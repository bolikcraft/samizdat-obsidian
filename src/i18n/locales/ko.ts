import type { Strings } from '../strings.ts';

export const ko: Strings = {
  'language.name': '한국어',

  'state.draft': '준비',
  'state.new': '발행',
  'state.changed': '업데이트',
  'state.published': '발행 취소',
  'state.offline': '연결 없음',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: 보내는 중…',
  'status.unreadable': 'Samizdat: 노트를 읽을 수 없음',

  'command.publish': '노트 발행하기',
  'command.check': '서버 연결 확인하기',
  'menu.publish': 'Samizdat: 발행하기',

  'notice.noSettings': '플러그인 설정을 여세요: 주소나 토큰이 없습니다',
  'notice.offline': '서버에 연결할 수 없습니다',
  'notice.unpublished': '글의 발행을 취소했습니다',
  'notice.updated': '글을 업데이트했습니다',
  'notice.published': '글을 발행했습니다',
  'notice.prepared': '노트가 준비되었습니다. 발행하려면 한 번 더 누르세요',
  'notice.attachmentSkipped': '이 첨부 파일은 보내지 않았습니다. 서버가 이런 이름을 받지 않습니다: {names}',
  'confirm.unpublish': '“{name}”의 발행을 취소할까요? 이 글의 게스트 링크는 더 이상 열리지 않습니다.',

  'settings.language.name': '언어',
  'settings.language.desc': '명령 이름은 Obsidian을 다시 시작한 다음에 바뀝니다.',
  'settings.language.auto': 'Obsidian과 같게',
  'settings.server.name': '서버 주소',
  'settings.server.desc': '예를 들어 http://127.0.0.1:5080',
  'settings.token.name': '토큰',
  'settings.token.desc': '사이트 설정 → 토큰 → 새 토큰 만들기',
  'settings.connection.name': '서버 연결',
  'settings.connection.button': '확인',
  'settings.connection.ok': '연결이 잘 됩니다. 서버에 있는 글: {count}개',
  'settings.connection.fail': '실패했습니다: {error}',

  'error.offline': '서버가 응답하지 않습니다: {address}',
  'error.token': '토큰이 맞지 않습니다',
  'error.status': '서버가 {status} 응답을 보냈습니다',
  'error.slugEmpty': 'slug가 비어 있습니다',
  'error.slugSlash': 'slug “{slug}”에 / 나 \\ 기호를 쓸 수 없습니다',
  'error.slugDots': 'slug “{slug}”에 “..”를 쓸 수 없습니다',
  'error.slugDot': 'slug “{slug}”의 첫 글자는 점일 수 없습니다',
  'error.slugControl': 'slug “{slug}”에 제어 문자를 쓸 수 없습니다',
  'error.slugQuery': 'slug “{slug}”에 ?, #, % 기호를 쓸 수 없습니다',
  'error.slugLong': 'slug “{slug}”이(가) UTF-8로 {max}바이트를 넘습니다',
};
