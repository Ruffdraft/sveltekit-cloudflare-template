import test from 'node:test';
import assert from 'node:assert/strict';
import { is_jwt_format_valid } from '../src/lib/tools/jwt.js';

test('accepts a well-formed token', () => {
  const token = 'header123456.payloadtest7890.signature_part';
  assert.strictEqual(is_jwt_format_valid(token), true);
});

test('rejects malformed tokens', () => {
  assert.strictEqual(is_jwt_format_valid(''), false);
  assert.strictEqual(is_jwt_format_valid('abc.def'), false);
  assert.strictEqual(is_jwt_format_valid('abc.def.ghi'), false);
  assert.strictEqual(is_jwt_format_valid('abc.def?.ghi'), false);
});
