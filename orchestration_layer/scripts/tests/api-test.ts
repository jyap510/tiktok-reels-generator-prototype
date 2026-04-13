// Run: npx tsx scripts/tests/api-test.ts
// Requires: dev server running at localhost:3000

import * as fs from 'fs';
import * as path from 'path';

// Load .env from repo root if dotenv is available
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dotenv = require('dotenv');
  const envPath = path.resolve(__dirname, '../../../../.env');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
} catch {
  // dotenv not available, rely on process.env
}

const BASE = 'http://localhost:3000';

let passed = 0;
let failed = 0;

function pass(desc: string) {
  console.log(`✓ PASS — ${desc}`);
  passed++;
}

function fail(desc: string, err: string) {
  console.log(`✗ FAIL — ${desc}: ${err}`);
  failed++;
}

async function get(path: string) {
  return fetch(`${BASE}${path}`);
}

async function post(path: string, body: unknown) {
  return fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function patch(path: string, body: unknown) {
  return fetch(`${BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function del(path: string) {
  return fetch(`${BASE}${path}`, { method: 'DELETE' });
}

async function run() {
  console.log('--- API Test Suite ---\n');

  let testPersonaId: number | null = null;

  // 1. GET /api/personas
  try {
    const res = await get('/api/personas');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const json = await res.json() as { personas?: unknown[] };
    if (!Array.isArray(json.personas)) throw new Error('missing personas array');
    pass('GET /api/personas → 200, personas array present');
  } catch (e) {
    fail('GET /api/personas', String(e));
  }

  // 2. POST /api/personas
  try {
    const res = await post('/api/personas', {
      handle: '__test_persona__',
      niche: 'testing',
      description: 'Test persona',
      gender: 'male',
    });
    if (res.status !== 201) throw new Error(`status ${res.status}`);
    const json = await res.json() as { id?: number };
    if (!json.id) throw new Error('missing id in response');
    testPersonaId = json.id;
    pass(`POST /api/personas → 201, id=${testPersonaId}`);
  } catch (e) {
    fail('POST /api/personas', String(e));
  }

  // 3. GET /api/personas/:id
  if (testPersonaId !== null) {
    try {
      const res = await get(`/api/personas/${testPersonaId}`);
      if (res.status !== 200) throw new Error(`status ${res.status}`);
      pass(`GET /api/personas/${testPersonaId} → 200`);
    } catch (e) {
      fail(`GET /api/personas/${testPersonaId}`, String(e));
    }
  } else {
    fail('GET /api/personas/:id', 'skipped — no persona id from step 2');
  }

  // 4. PATCH /api/personas/:id
  if (testPersonaId !== null) {
    try {
      const res = await patch(`/api/personas/${testPersonaId}`, {
        description: 'Updated description',
      });
      if (res.status !== 200) throw new Error(`status ${res.status}`);
      pass(`PATCH /api/personas/${testPersonaId} → 200`);
    } catch (e) {
      fail(`PATCH /api/personas/${testPersonaId}`, String(e));
    }
  } else {
    fail('PATCH /api/personas/:id', 'skipped — no persona id from step 2');
  }

  // 5. DELETE /api/personas/:id
  if (testPersonaId !== null) {
    try {
      const res = await del(`/api/personas/${testPersonaId}`);
      if (res.status !== 200 && res.status !== 204) throw new Error(`status ${res.status}`);
      pass(`DELETE /api/personas/${testPersonaId} → ${res.status}`);
      testPersonaId = null; // cleaned up
    } catch (e) {
      fail(`DELETE /api/personas/${testPersonaId}`, String(e));
    }
  } else {
    fail('DELETE /api/personas/:id', 'skipped — no persona id from step 2');
  }

  // 6. GET /api/listings
  try {
    const res = await get('/api/listings');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const json = await res.json() as { listings?: unknown[] };
    if (!Array.isArray(json.listings)) throw new Error('missing listings array');
    pass('GET /api/listings → 200, listings array present');
  } catch (e) {
    fail('GET /api/listings', String(e));
  }

  // 7. POST /api/listings
  try {
    const res = await post('/api/listings', {
      asin: '__TEST_ASIN__',
      title: 'Test Product',
      brand: 'TestBrand',
      images: [],
      reviews: [],
    });
    if (res.status !== 201) throw new Error(`status ${res.status}`);
    pass('POST /api/listings → 201');
  } catch (e) {
    fail('POST /api/listings', String(e));
  }

  // 8. GET /api/listings again — check test listing appears
  try {
    const res = await get('/api/listings?limit=100');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const json = await res.json() as { listings?: Array<{ asin?: string }> };
    if (!Array.isArray(json.listings)) throw new Error('missing listings array');
    const found = json.listings.some((l) => l.asin === '__TEST_ASIN__');
    if (!found) throw new Error('test listing not found in response');
    pass('GET /api/listings (after POST) → test listing present');
  } catch (e) {
    fail('GET /api/listings (after POST)', String(e));
  }
  // Cleanup note: __TEST_ASIN__ uses INSERT OR REPLACE so re-running is idempotent.
  // To remove: DELETE FROM listings WHERE asin = '__TEST_ASIN__' via DB, or add a DELETE endpoint.

  // 9. GET /api/runs
  try {
    const res = await get('/api/runs');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const json = await res.json() as { runs?: unknown[] };
    if (!Array.isArray(json.runs)) throw new Error('missing runs array');
    pass('GET /api/runs → 200, runs array present');
  } catch (e) {
    fail('GET /api/runs', String(e));
  }

  // 10. GET /api/runs/11cd701e
  try {
    const res = await get('/api/runs/11cd701e');
    if (res.status === 200) {
      console.log(`✓ PASS — GET /api/runs/11cd701e → 200 (run found)`);
      passed++;
    } else if (res.status === 404) {
      console.log(`✓ PASS — GET /api/runs/11cd701e → 404 (run not seeded, acceptable)`);
      passed++;
    } else {
      throw new Error(`unexpected status ${res.status}`);
    }
  } catch (e) {
    fail('GET /api/runs/11cd701e', String(e));
  }

  // 11. GET /api/files/11cd701e/avatar.png
  try {
    const res = await get('/api/files/11cd701e/avatar.png');
    if (res.status === 200) {
      console.log(`✓ PASS — GET /api/files/11cd701e/avatar.png → 200 (file served)`);
      passed++;
    } else if (res.status === 404) {
      console.log(`✓ PASS — GET /api/files/11cd701e/avatar.png → 404 (file not on disk, acceptable)`);
      passed++;
    } else {
      throw new Error(`unexpected status ${res.status}`);
    }
  } catch (e) {
    fail('GET /api/files/11cd701e/avatar.png', String(e));
  }

  // 12. POST /api/personas/suggest-prompts
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    console.log(`  (skip) POST /api/personas/suggest-prompts — OPENAI_API_KEY not set`);
  } else {
    try {
      const res = await post('/api/personas/suggest-prompts', {
        handle: 'TestHandle',
        niche: 'tech',
        description: 'A tech reviewer',
        gender: 'male',
      });
      if (res.status !== 200) throw new Error(`status ${res.status}`);
      const json = await res.json() as { avatar_prompt?: string; profile_pic_prompt?: string };
      if (!json.avatar_prompt || !json.profile_pic_prompt) throw new Error('missing prompt fields');
      pass('POST /api/personas/suggest-prompts → 200, prompts returned');
    } catch (e) {
      fail('POST /api/personas/suggest-prompts', String(e));
    }
  }

  // Cleanup: if test persona wasn't deleted (e.g. DELETE failed), try again
  if (testPersonaId !== null) {
    try {
      await del(`/api/personas/${testPersonaId}`);
    } catch {
      // best effort
    }
  }

  console.log(`\n--- Summary: ${passed}/${passed + failed} passed ---`);
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
