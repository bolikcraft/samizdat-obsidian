import { App, TFile } from 'obsidian';
import type { Attachment } from '../core/hash.ts';
import { slugFromTitle, validateSlug } from '../core/slug.ts';

const IMAGE = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

export interface NoteSnapshot {
  slug: string;
  folder: string;
  markdown: Uint8Array;
  attachments: Attachment[];
  published: boolean;
}

export async function readNote(app: App, file: TFile): Promise<NoteSnapshot> {
  const buffer = await app.vault.readBinary(file);
  const markdown = new Uint8Array(buffer);

  const parent = file.parent?.path ?? '';
  const folder = parent === '/' ? '' : parent;

  const front = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
  const published = front.publish === true;

  const slug = typeof front.slug === 'string' && front.slug.length > 0
    ? validateSlug(front.slug)
    : slugFromTitle(typeof front.title === 'string' && front.title.length > 0 ? front.title : file.basename);

  const attachments: Attachment[] = [];
  const links = app.metadataCache.resolvedLinks[file.path] ?? {};
  for (const path of Object.keys(links)) {
    if (!IMAGE.test(path)) continue;
    const target = app.vault.getFileByPath(path);
    if (!target) continue;
    const bytes = new Uint8Array(await app.vault.readBinary(target));
    attachments.push({ name: target.name, bytes });
  }

  return { slug, folder, markdown, attachments, published };
}
