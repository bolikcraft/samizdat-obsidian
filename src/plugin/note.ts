import { App, TFile } from 'obsidian';
import type { Attachment } from '../core/hash.ts';
import { slugFromTitle, validateSlug } from '../core/slug.ts';

export interface NoteSnapshot {
  slug: string;
  folder: string;
  /// File name without .md, as the CLI sends it. The server finds [[links]] by this name.
  name: string;
  markdown: Uint8Array;
  attachments: Attachment[];
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

  const slug = typeof front.slug === 'string' && front.slug.length > 0
    ? validateSlug(front.slug)
    : slugFromTitle(typeof front.title === 'string' && front.title.length > 0 ? front.title : file.basename);

  const attachments: Attachment[] = [];
  const seen = new Set<string>();
  const embeds = app.metadataCache.getFileCache(file)?.embeds ?? [];
  for (const embed of embeds) {
    const target = app.metadataCache.getFirstLinkpathDest(embed.link, file.path);
    // Встроенную заметку не шлём: CLI ищет файл по имени с расширением и такую ссылку не находит.
    if (!target || target.extension === 'md' || seen.has(target.name)) continue;
    seen.add(target.name);
    const bytes = new Uint8Array(await app.vault.readBinary(target));
    attachments.push({ name: target.name, bytes });
  }

  return { slug, folder, name: file.basename, markdown, attachments, published };
}

function stripBom(bytes: Uint8Array): Uint8Array {
  const hasBom = bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
  return hasBom ? bytes.slice(3) : bytes;
}
