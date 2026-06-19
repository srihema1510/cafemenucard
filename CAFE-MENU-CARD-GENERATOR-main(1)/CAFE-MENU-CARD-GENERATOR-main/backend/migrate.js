const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, './database/cafe.db');
const db = new Database(dbPath, { verbose: console.log });

try {
  db.exec(`ALTER TABLE categories ADD COLUMN template_id INTEGER NOT NULL DEFAULT 1`);
  console.log("Added template_id to categories.");
} catch(e) {
  console.log("Error adding template_id to categories (might already exist):", e.message);
}

try {
  db.exec(`ALTER TABLE menu_items ADD COLUMN template_id INTEGER NOT NULL DEFAULT 1`);
  console.log("Added template_id to menu_items.");
} catch(e) {
  console.log("Error adding template_id to menu_items (might already exist):", e.message);
}

db.close();
