const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.resolve(__dirname, '../../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(dbDir, 'cafe.db');
const db = new Database(dbPath);

const pool = {
  query: async (text, params) => {
    // Replace PostgreSQL $1, $2 with SQLite ?
    const sqliteText = text.replace(/\$\d+/g, '?');
    
    try {
      if (sqliteText.trim().toUpperCase().startsWith('SELECT') || sqliteText.trim().toUpperCase().startsWith('PRAGMA') || sqliteText.toUpperCase().includes('RETURNING')) {
        const rows = db.prepare(sqliteText).all(params || []);
        return { rows, rowCount: rows.length };
      } else {
        const result = db.prepare(sqliteText).run(params || []);
        return { rows: [{ id: result.lastInsertRowid }], rowCount: result.changes };
      }
    } catch (e) {
      console.error("DB Query Error:", e.message, "\nQuery:", sqliteText, params);
      throw e;
    }
  }
};

module.exports = pool;
