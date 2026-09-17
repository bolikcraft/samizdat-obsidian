import type { Strings } from '../strings.ts';

export const id: Strings = {
  'language.name': 'Bahasa Indonesia',

  'state.draft': 'Siapkan',
  'state.new': 'Terbitkan',
  'state.changed': 'Perbarui',
  'state.published': 'Tarik',
  'state.offline': 'Tidak ada koneksi',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: mengirim…',
  'status.unreadable': 'Samizdat: catatan tidak terbaca',

  'command.publish': 'Terbitkan catatan',
  'command.check': 'Periksa koneksi ke server',
  'menu.publish': 'Samizdat: terbitkan',

  'notice.noSettings': 'Buka pengaturan plugin: alamat atau token belum ada',
  'notice.offline': 'Tidak ada koneksi ke server',
  'notice.unpublished': 'Artikel sudah ditarik',
  'notice.updated': 'Artikel sudah diperbarui',
  'notice.published': 'Artikel sudah terbit',
  'notice.prepared': 'Catatan sudah siap. Klik sekali lagi untuk menerbitkannya',
  'notice.attachmentSkipped': 'Lampiran ini tidak dikirim, server tidak menerima nama seperti itu: {names}',
  'confirm.unpublish': 'Tarik "{name}"? Tautan tamu ke artikel ini tidak akan berfungsi lagi.',

  'settings.language.name': 'Bahasa',
  'settings.language.desc': 'Nama perintah berubah hanya setelah Obsidian dimulai ulang.',
  'settings.language.auto': 'sama dengan Obsidian',
  'settings.server.name': 'Alamat server',
  'settings.server.desc': 'Misalnya http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Pengaturan situs → Token → buat token baru',
  'settings.connection.name': 'Koneksi ke server',
  'settings.connection.button': 'Periksa',
  'settings.connection.ok': 'Koneksi berfungsi. Artikel di server: {count}',
  'settings.connection.fail': 'Gagal: {error}',

  'error.offline': 'Server tidak menjawab: {address}',
  'error.token': 'Token tidak diterima',
  'error.status': 'Server menjawab {status}',
  'error.slugEmpty': 'slug kosong',
  'error.slugSlash': 'slug "{slug}" tidak boleh berisi / atau \\',
  'error.slugDots': 'slug "{slug}" tidak boleh berisi ".."',
  'error.slugDot': 'slug "{slug}" tidak boleh diawali titik',
  'error.slugControl': 'slug "{slug}" tidak boleh berisi karakter kontrol',
  'error.slugQuery': 'slug "{slug}" tidak boleh berisi ?, # atau %',
  'error.slugLong': 'slug "{slug}" lebih dari {max} byte dalam UTF-8',
};
