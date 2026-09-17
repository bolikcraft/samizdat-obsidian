import { hasControl } from './slug.ts';

// Same pattern as VaultScanner in the CLI. After the name, "|300", "|caption" or "#anchor" can follow.
const EMBED = /^!\[\[(?<name>[^\]|#]+)(?:[|#][^\]]*)?\]\]$|^!\[[^\]]*\]\((?<path>[^)]+)\)$/;

/// Port of SafeName.IsAttachment. The server refuses the full article for a bad name.
export function isAttachmentName(name: string): boolean {
  return isSegment(name) && !isSource(name);
}

function isSegment(name: string): boolean {
  return name.length > 0 && name !== '.' && name !== '..'
    && !name.includes('/') && !name.includes('\\') && !hasControl(name);
}

// Windows and zip remove trailing spaces and dots, so "index.md." is also the article source.
function isSource(name: string): boolean {
  return name.replace(/[ .]+$/, '').toLowerCase() === 'index.md';
}

/// Attachment name as the CLI sends it: the last segment of the link text. The case of the link wins
/// over the case of the file on disk. null for an external link or an unknown embed form.
export function embedFileName(original: string): string | null {
  const match = EMBED.exec(original.trim());
  if (!match?.groups) return null;

  const reference = (match.groups.name ?? unescapeData(match.groups.path)).trim();
  if (reference.toLowerCase().startsWith('http')) return null;

  return reference.slice(reference.lastIndexOf('/') + 1);
}

// Uri.UnescapeDataString keeps a bad percent sequence as it is. decodeURIComponent throws.
function unescapeData(text: string): string {
  return text.replace(/(?:%[0-9A-Fa-f]{2})+/g, sequence => {
    try {
      return decodeURIComponent(sequence);
    } catch {
      return sequence;
    }
  });
}
