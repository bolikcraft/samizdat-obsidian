import type { Strings } from '../strings.ts';

export const pl: Strings = {
  'language.name': 'Polski',

  'state.draft': 'Przygotuj',
  'state.new': 'Opublikuj',
  'state.changed': 'Zaktualizuj',
  'state.published': 'Wycofaj',
  'state.offline': 'Brak połączenia',

  'status.label': 'Samizdat: {label}',
  'status.busy': 'Samizdat: wysyłanie…',
  'status.unreadable': 'Samizdat: nie można odczytać notatki',

  'command.publish': 'Opublikuj notatkę',
  'command.check': 'Sprawdź połączenie z serwerem',
  'menu.publish': 'Samizdat: opublikuj',

  'notice.noSettings': 'Otwórz ustawienia wtyczki: brak adresu lub tokena',
  'notice.offline': 'Brak połączenia z serwerem',
  'notice.unpublished': 'Artykuł jest wycofany',
  'notice.updated': 'Artykuł jest zaktualizowany',
  'notice.published': 'Artykuł jest opublikowany',
  'notice.prepared': 'Notatka jest gotowa. Kliknij jeszcze raz, aby ją opublikować',
  'confirm.unpublish': 'Wycofać „{name}”? Linki dla gości przestaną działać.',

  'settings.language.name': 'Język',
  'settings.language.desc': 'Nazwy poleceń zmieniają się dopiero po ponownym uruchomieniu Obsidiana.',
  'settings.language.auto': 'tak jak w Obsidianie',
  'settings.server.name': 'Adres serwera',
  'settings.server.desc': 'Na przykład http://127.0.0.1:5080',
  'settings.token.name': 'Token',
  'settings.token.desc': 'Ustawienia witryny → Tokeny → zrób nowy token',
  'settings.connection.name': 'Połączenie z serwerem',
  'settings.connection.button': 'Sprawdź',
  'settings.connection.ok': 'Połączenie działa. Artykułów na serwerze: {count}',
  'settings.connection.fail': 'Nie udało się: {error}',

  'error.offline': 'Serwer nie odpowiada: {address}',
  'error.token': 'Token nie został przyjęty',
  'error.status': 'Serwer odpowiedział {status}',
  'error.slugEmpty': 'slug jest pusty',
  'error.slugSlash': 'slug „{slug}” nie może zawierać / ani \\',
  'error.slugDots': 'slug „{slug}” nie może zawierać „..”',
  'error.slugDot': 'slug „{slug}” nie może zaczynać się od kropki',
};
