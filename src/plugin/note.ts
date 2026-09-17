import { App, TFile, getLinkpath } from 'obsidian';
import { embedFileName, isAttachmentName } from '../core/attachment.ts';
import type { Attachment } from '../core/hash.ts';
import { noteSlug } from '../core/slug.ts';

export interface NoteSnapshot {
  slug: string;
  folder: string;
  /// File name without .md, as the CLI sends it. The server finds [[links]] by this name.
  name: string;
  markdown: Uint8Array;
  attachments: Attachment[];
  /// Attachment names that the server refuses. The CLI skips them and publishes the note.
  skipped: string[];
  published: boolean;
}

export async function readNote(app: App, file: TFile): Promise<NoteSnapshot> {
  // readBinary — чтобы получить те же байты, что читает CLI (File.ReadAllText уже без BOM).
  const buffer = await app.vault.readBinary(file);
  const markdown = stripBom(new Uint8Array(buffer));

  const parent = file.parent?.path ?? '';
  const folder = parent === '/' ? '' : parent;

  const front = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
  const published = front.publish === true;

  const slug = noteSlug(front, file.basename);

  const attachments: Attachment[] = [];
  const skipped: string[] = [];
  const seen = new Set<string>();
  const embeds = app.metadataCache.getFileCache(file)?.embeds ?? [];
  for (const embed of embeds) {
    const name = embedFileName(embed.original);
    if (name === null) continue;
    const target = app.metadataCache.getFirstLinkpathDest(getLinkpath(embed.link), file.path);
    // Встроенную заметку не шлём: CLI ищет файл по имени с расширением и такую ссылку не находит.
    if (!target || target.extension === 'md') continue;
    if (!isAttachmentName(name)) {
      if (!skipped.includes(name)) skipped.push(name);
      continue;
    }
    // The server keeps attachments flat by name, so the CLI sends only the first file with a name.
    if (seen.has(name)) continue;
    seen.add(name);
    const bytes = new Uint8Array(await app.vault.readBinary(target));
    attachments.push({ name, bytes });
  }

  return { slug, folder, name: file.basename, markdown, attachments, skipped, published };
}

function stripBom(bytes: Uint8Array): Uint8Array {
  const hasBom = bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
  return hasBom ? bytes.slice(3) : bytes;
}
