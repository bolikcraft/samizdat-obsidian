import test from 'node:test';
import assert from 'node:assert';
import { buttonState, buttonLabel } from '../src/core/state.ts';

test('нет publish — оформить', () => {
  assert.equal(buttonState({ published: false, onServer: false, sameHash: false }), 'draft');
});

test('publish есть, на сервере нет — опубликовать', () => {
  assert.equal(buttonState({ published: true, onServer: false, sameHash: false }), 'new');
});

test('на сервере есть, хэш разошёлся — обновить', () => {
  assert.equal(buttonState({ published: true, onServer: true, sameHash: false }), 'changed');
});

test('на сервере есть, хэш совпал — снять с публикации', () => {
  assert.equal(buttonState({ published: true, onServer: true, sameHash: true }), 'published');
});

test('статья на сервере важнее отсутствия publish', () => {
  assert.equal(buttonState({ published: false, onServer: true, sameHash: true }), 'published');
});

test('нет связи перебивает всё, если publish стоит', () => {
  assert.equal(buttonState({ published: true, onServer: true, sameHash: true, offline: true }), 'offline');
});

test('нет связи, но publish не стоит — оформить', () => {
  assert.equal(buttonState({ published: false, onServer: false, sameHash: false, offline: true }), 'draft');
});

test('нет связи, publish стоит — нет связи', () => {
  assert.equal(buttonState({ published: true, onServer: false, sameHash: false, offline: true }), 'offline');
});

test('надписи по-русски', () => {
  assert.equal(buttonLabel('draft'), 'Оформить');
  assert.equal(buttonLabel('new'), 'Опубликовать');
  assert.equal(buttonLabel('changed'), 'Обновить');
  assert.equal(buttonLabel('published'), 'Снять с публикации');
  assert.equal(buttonLabel('offline'), 'Нет связи');
});
