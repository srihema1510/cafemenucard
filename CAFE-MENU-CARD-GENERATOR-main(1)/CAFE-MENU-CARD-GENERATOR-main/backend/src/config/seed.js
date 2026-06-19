const db = require('./db');
const bcrypt = require('bcrypt');

const initDB = async () => {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cafe_info (
      id INTEGER PRIMARY KEY DEFAULT 1,
      cafe_name TEXT NOT NULL DEFAULT 'My Cafe',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL DEFAULT 1,
      name TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL DEFAULT 1,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      item_name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Check if admin exists
  const adminRow = db.prepare('SELECT COUNT(*) as count FROM admin').get();
  if (adminRow.count === 0) {
    console.log('Seeding admin user...');
    const hash = await bcrypt.hash('123', 12);
    db.prepare('INSERT INTO admin (email, password_hash) VALUES (?, ?)').run('admin@gmail.com', hash);

    console.log('Seeding cafe info...');
    db.prepare('INSERT INTO cafe_info (cafe_name) VALUES (?)').run('Coffee House');

    console.log('Seeding categories and items...');
    const categories = ['Coffee', 'Tea', 'Milkshakes', 'Snacks', 'Desserts'];
    const insertCat = db.prepare('INSERT INTO categories (name, display_order) VALUES (?, ?)');
    const insertItem = db.prepare('INSERT INTO menu_items (category_id, item_name, price, display_order) VALUES (?, ?, ?, ?)');

    const itemsMap = {
      'Coffee': [
        { name: 'Espresso', price: 90 },
        { name: 'Cappuccino', price: 150 },
        { name: 'Latte', price: 170 }
      ],
      'Tea': [
        { name: 'Masala Chai', price: 50 },
        { name: 'Green Tea', price: 70 },
        { name: 'Lemon Tea', price: 60 }
      ],
      'Milkshakes': [
        { name: 'Oreo Shake', price: 180 },
        { name: 'Strawberry Shake', price: 160 }
      ],
      'Snacks': [
        { name: 'French Fries', price: 120 },
        { name: 'Cheese Sandwich', price: 140 },
        { name: 'Garlic Bread', price: 150 }
      ],
      'Desserts': [
        { name: 'Chocolate Brownie', price: 150 },
        { name: 'Cheesecake', price: 220 }
      ]
    };

    categories.forEach((cat, index) => {
      const info = insertCat.run(cat, index);
      const catId = info.lastInsertRowid;
      const items = itemsMap[cat];
      if (items) {
        items.forEach((item, itemIndex) => {
          insertItem.run(catId, item.name, item.price, itemIndex);
        });
      }
    });

    console.log('Database seeded successfully.');
  } else {
    console.log('Database already initialized.');
  }
};

module.exports = { initDB };
