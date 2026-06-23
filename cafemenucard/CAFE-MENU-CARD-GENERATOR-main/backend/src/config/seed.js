const db = require('./db');
const bcrypt = require('bcrypt');

const initDB = async () => {
  try {
    // Create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cafe_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cafe_name TEXT NOT NULL DEFAULT 'My Cafe',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        template_id INTEGER NOT NULL DEFAULT 1,
        name TEXT NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        template_id INTEGER NOT NULL DEFAULT 1,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        item_name TEXT NOT NULL,
        price NUMERIC NOT NULL CHECK(price >= 0),
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if admin exists
    const adminRes = await db.query('SELECT COUNT(*) as count FROM admin');
    const adminCount = parseInt(adminRes.rows[0].count, 10);
    
    if (adminCount === 0) {
      console.log('Seeding admin user...');
      const hash = await bcrypt.hash('123', 12);
      await db.query('INSERT INTO admin (email, password_hash) VALUES ($1, $2)', ['admin@gmail.com', hash]);

      console.log('Seeding cafe info...');
      // Explicitly set ID to 1 so the default ID logic works in cafeController
      await db.query('INSERT INTO cafe_info (id, cafe_name) VALUES (1, $1)', ['Coffee House']);

      console.log('Seeding categories and items...');
      const categories = ['Coffee', 'Tea', 'Milkshakes', 'Snacks', 'Desserts'];
      
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

      for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const res = await db.query('INSERT INTO categories (name, display_order) VALUES ($1, $2) RETURNING id', [cat, i]);
        const catId = res.rows[0].id;
        
        const items = itemsMap[cat];
        if (items) {
          for (let j = 0; j < items.length; j++) {
            const item = items[j];
            await db.query('INSERT INTO menu_items (category_id, item_name, price, display_order) VALUES ($1, $2, $3, $4)', [catId, item.name, item.price, j]);
          }
        }
      }

      console.log('Database seeded successfully.');
    } else {
      console.log('Database already initialized.');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

module.exports = { initDB };
