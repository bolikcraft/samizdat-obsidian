export type ButtonState = 'draft' | 'new' | 'changed' | 'published' | 'offline';

export interface NoteFacts {
  published: boolean;
  onServer: boolean;
  sameHash: boolean;
  offline?: boolean;
}

export function buttonState(facts: NoteFacts): ButtonState {
  // Оформление — правка своего файла, сервер ей не нужен: без publish связь не мешает.
  if (facts.offline) return facts.published ? 'offline' : 'draft';
  if (facts.onServer) return facts.sameHash ? 'published' : 'changed';
  return facts.published ? 'new' : 'draft';
}
