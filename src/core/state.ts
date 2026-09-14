export type ButtonState = 'draft' | 'new' | 'changed' | 'published' | 'offline';

export interface NoteFacts {
  published: boolean;
  onServer: boolean;
  sameHash: boolean;
  offline?: boolean;
}

export function buttonState(facts: NoteFacts): ButtonState {
  if (facts.offline) return 'offline';
  if (facts.onServer) return facts.sameHash ? 'published' : 'changed';
  return facts.published ? 'new' : 'draft';
}

const LABELS: Record<ButtonState, string> = {
  draft: 'Оформить',
  new: 'Опубликовать',
  changed: 'Обновить',
  published: 'Снять с публикации',
  offline: 'Нет связи',
};

export function buttonLabel(state: ButtonState): string {
  return LABELS[state];
}
