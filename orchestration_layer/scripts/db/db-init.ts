#!/usr/bin/env tsx
// Run: npx tsx scripts/db-init.ts
// Reads db/schema.sql, opens db/tiktok.db, executes schema. Idempotent.
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..');
const DB_DIR = path.join(ROOT, 'db');
const DB_PATH = path.join(DB_DIR, 'tiktok.db');
const SCHEMA_PATH = path.join(DB_DIR, 'schema.sql');

fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

console.log('DB initialized at', DB_PATH);
db.close();
