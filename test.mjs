import test from 'node:test';
import assert from 'node:assert/strict';
import { classify } from './main.mjs';
test('contrat et limite', () => {
  assert.match(classify({ entries: [] }), /Classement personnel/);
  assert.throws(() => classify({ entries: [{ title: 'T', collection: 'C' }] }));
});

