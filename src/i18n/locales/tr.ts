import type { Strings } from '../strings.ts';

export const tr: Strings = {
  'language.name': 'Türkçe',

  'state.draft': 'Hazırla',
  'state.new': 'Yayımla',
  'state.changed': 'Güncelle',
  'state.published': 'Yayından kaldır',
  'state.offline': 'Bağlantı yok',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: gönderiliyor…',
  'status.unreadable': 'Samizdat: not okunamıyor',

  'command.publish': 'Notu yayımla',
  'command.check': 'Sunucu bağlantısını denetle',
  'menu.publish': 'Samizdat: yayımla',

  'notice.noSettings': 'Eklenti ayarlarını aç: adres veya belirteç yok',
  'notice.offline': 'Sunucuya bağlantı yok',
  'notice.unpublished': 'Yazı yayından kaldırıldı',
  'notice.updated': 'Yazı güncellendi',
  'notice.published': 'Yazı yayımlandı',
  'notice.prepared': 'Not hazır. Yayımlamak için bir daha tıkla',
  'confirm.unpublish': '“{name}” yayından kaldırılsın mı? Konuk bağlantıları artık çalışmaz.',

  'settings.language.name': 'Dil',
  'settings.language.desc': 'Komut adları ancak Obsidian yeniden başlayınca değişir.',
  'settings.language.auto': 'Obsidian ile aynı',
  'settings.server.name': 'Sunucu adresi',
  'settings.server.desc': 'Örneğin http://127.0.0.1:5080',
  'settings.token.name': 'Belirteç',
  'settings.token.desc': 'Site ayarları → Belirteçler → yeni belirteç yap',
  'settings.connection.name': 'Sunucu bağlantısı',
  'settings.connection.button': 'Denetle',
  'settings.connection.ok': 'Bağlantı çalışıyor. Sunucudaki yazı sayısı: {count}',
  'settings.connection.fail': 'Olmadı: {error}',

  'error.offline': 'Sunucu yanıt vermiyor: {address}',
  'error.token': 'Belirteç kabul edilmedi',
  'error.status': 'Sunucu {status} yanıtını verdi',
  'error.slugEmpty': 'slug boş',
  'error.slugSlash': '“{slug}” slug’ı / ve \\ içeremez',
  'error.slugDots': '“{slug}” slug’ı “..” içeremez',
  'error.slugDot': '“{slug}” slug’ı nokta ile başlayamaz',
  'error.slugControl': '“{slug}” slug’ı kontrol karakterleri içeremez',
  'error.slugQuery': '“{slug}” slug’ı ?, # ve % içeremez',
  'error.slugLong': '“{slug}” slug’ı UTF-8’de {max} bayttan uzun',
};
