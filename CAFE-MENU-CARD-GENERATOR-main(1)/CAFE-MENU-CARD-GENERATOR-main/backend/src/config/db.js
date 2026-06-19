const Database = require('better-sqlite3');
const path = require('path');
const fs = require('path');

const dbPath = path.resolve(__dirname, '../../database/cafe.db');

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
require('fs').mkdirSync(dbDir, { recursive: true });

const db = new Database(dbPath, { verbose: null });
db.pragma('journal_mode = WAL'); // Enable WAL mode for better concurrency
db.pragma('foreign_keys = ON');  // Enable foreign key constraints

module.exports = db;
