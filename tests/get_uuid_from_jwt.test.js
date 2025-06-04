import test from 'node:test';
import assert from 'node:assert/strict';
import { get_uuid_from_jwt } from '../src/lib/tools/jwt.js';

const b64 = (str) => Buffer.from(str).toString('base64url');

function makeToken(payloadObj) {
  const header = b64('{"alg":"HS256"}');
  const payload = b64(JSON.stringify(payloadObj));
  return `${header}.${payload}.signature`;
}

test('extracts uuid from valid token', () => {
  const token = makeToken({ uuid: '12345678-abcd-efgh-ijkl' });
  assert.strictEqual(get_uuid_from_jwt(token), '12345678-abcd-efgh-ijkl');
});

test('returns "na" for invalid token format', () => {
  assert.strictEqual(get_uuid_from_jwt('abc.def.ghi'), 'na');
});

test('returns "na" when uuid is missing', () => {
  const token = makeToken({});
  assert.strictEqual(get_uuid_from_jwt(token), 'na');
});
