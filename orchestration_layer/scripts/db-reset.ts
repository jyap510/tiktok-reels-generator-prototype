#!/usr/bin/env tsx
// Run: npx tsx scripts/db-reset.ts
// Wipes all rows from all tables without dropping them. Idempotent.
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'db', 'tiktok.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

const tables = ['generations', 'prompt_drafts', 'runs', 'listings', 'personas'];
for (const table of tables) {
  try {
    db.prepare(`DELETE FROM ${table}`).run();
    try { db.prepare(`DELETE FROM sqlite_sequence WHERE name = ?`).run(table); } catch {}
    console.log(`Cleared ${table}`);
  } catch (err) {
    // Table may not exist yet, skip
  }
}

console.log('DB reset complete');
db.close();
