import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'db');
const DB_PATH = path.join(DB_DIR, 'tiktok.db');

fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

export default db;
