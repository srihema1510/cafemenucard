const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, './database/cafe.db');
const db = new Database(dbPath, { verbose: console.log });

console.log("Wiping existing categories and menu items...");
db.exec('DELETE FROM menu_items');
db.exec('DELETE FROM categories');

const insertCat = db.prepare('INSERT INTO categories (name, display_order, template_id) VALUES (?, ?, ?)');
const insertItem = db.prepare('INSERT INTO menu_items (category_id, item_name, price, display_order, template_id) VALUES (?, ?, ?, ?, ?)');

const templatesData = [
  {
    id: 1,
    categories: {
      'Luxury Brews': [
        { name: 'Gold Leaf Espresso', price: 250 },
        { name: 'Truffle Mocha', price: 300 }
      ],
      'Premium Teas': [
        { name: 'Silver Needle White Tea', price: 200 }
      ]
    }
  },
  {
    id: 2,
    categories: {
      'Signature Coffees': [
        { name: 'Caramel Macchiato', price: 180 },
        { name: 'Vanilla Bean Latte', price: 190 }
      ],
      'Pastries': [
        { name: 'Almond Croissant', price: 150 }
      ]
    }
  },
  {
    id: 3,
    categories: {
      'Hot': [
        { name: 'Black Coffee', price: 100 },
        { name: 'Flat White', price: 140 }
      ],
      'Cold': [
        { name: 'Iced Americano', price: 120 }
      ],
      'Bites': [
        { name: 'Avocado Toast', price: 220 }
      ]
    }
  },
  {
    id: 4,
    categories: {
      'Dark Roasts': [
        { name: 'Midnight Espresso', price: 130 }
      ],
      'Elegant Desserts': [
        { name: 'Dark Chocolate Tart', price: 250 }
      ]
    }
  },
  {
    id: 5,
    categories: {
      'Classic Pour': [
        { name: 'Vintage Drip Coffee', price: 110 }
      ],
      'Heritage Sweets': [
        { name: 'Classic Victoria Sponge', price: 180 }
      ]
    }
  },
  {
    id: 6,
    categories: {
      'Structural Brews': [
        { name: 'Architects Blend', price: 160 }
      ],
      'Constructed Bites': [
        { name: 'Layered Mille-Feuille', price: 280 }
      ]
    }
  },
  {
    id: 7,
    categories: {
      'Appetizers': [
        { name: 'Bruschetta', price: 150 }
      ],
      'Mains': [
        { name: 'Truffle Pasta', price: 450 }
      ]
    }
  },
  {
    id: 8,
    categories: {
      'Bold Brews': [
        { name: 'Typography Espresso', price: 120 }
      ],
      'Clean Sweets': [
        { name: 'Minimalist Cheesecake', price: 200 }
      ]
    }
  },
  {
    id: 9,
    categories: {
      'Creative Canvas': [
        { name: 'Artisan Latte Art', price: 170 }
      ],
      'Palette Cleansers': [
        { name: 'Lemon Sorbet', price: 140 }
      ]
    }
  },
  {
    id: 10,
    categories: {
      'Simplicity': [
        { name: 'Pure Black', price: 90 }
      ],
      'Luxury': [
        { name: 'Saffron Infused Milk', price: 300 }
      ]
    }
  },
  {
    id: 11,
    categories: {
      'Brand Signatures': [
        { name: 'The Original Roast', price: 150 }
      ]
    }
  },
  {
    id: 12,
    categories: {
      'Hot Coffee': [
        { name: 'Swan Latte', price: 7.50 },
        { name: 'Poet\'s Espresso', price: 6.00 },
        { name: 'Midnight Mocha', price: 8.00 }
      ],
      'Cold Drinks': [
        { name: 'Iced Swan Latte', price: 8.50 },
        { name: 'Caramel Breeze', price: 8.00 }
      ],
      'Signature Drinks': [
        { name: 'Silent Swan', price: 8.50 },
        { name: 'Poetry Latte', price: 8.00 }
      ],
      'Tea & Herbs': [
        { name: 'Calm Mind Tea', price: 6.50 },
        { name: 'Rose Tea', price: 7.00 }
      ],
      'Desserts': [
        { name: 'Tiramisu', price: 6.50 },
        { name: 'Chocolate Cake', price: 6.50 },
        { name: 'Macarons', price: 5.50 }
      ]
    }
  },
  {
    id: 13,
    categories: {
      'Featured Items': [
        { name: 'Signature Blend', price: 4.50 },
        { name: 'Artisan Pastry', price: 3.50 }
      ]
    }
  },
  {
    id: 14,
    categories: {
      'Non Coffee': [
        { name: 'Matcha Latte', price: 3.50 },
        { name: 'Hot Chocolate', price: 3.80 },
        { name: 'Iced Tea', price: 2.90 },
        { name: 'Fruit Tea', price: 3.20 },
        { name: 'Iced Berry Tea', price: 3.30 },
        { name: 'Milkshake', price: 3.90 }
      ]
    }
  },
  {
    id: 15,
    categories: {
      'Coffee Menu': [
        { name: 'Espresso', price: 246.9 },
        { name: 'Capcucino', price: 248.9 },
        { name: 'Americano', price: 199.9 },
        { name: 'Ancchan', price: 179.9 },
        { name: 'Maxchato', price: 246.9 },
        { name: 'Mcchiato', price: 173.9 }
      ]
    }
  },
  {
    id: 16,
    categories: {
      'Light Bites': [
        { name: 'Croissant', price: 15.90 },
        { name: 'Bagels & Cheese', price: 11.50 },
        { name: 'Muffin', price: 11.50 },
        { name: 'Muffin', price: 23.10 },
        { name: 'Cookies', price: 22.90 },
        { name: 'Scone', price: 12.50 }
      ]
    }
  },
  {
    id: 17,
    categories: {
      'Desserts Menu': [
        { name: 'Cheesad eđus', price: 705.05 },
        { name: 'Tunra sprese', price: 905.05 },
        { name: 'Tinuce amiples', price: 905.06 },
        { name: 'Troisset outrics', price: 903.01 },
        { name: 'Krouth ciiras', price: 555.09 },
        { name: 'Eartlyniukintevies', price: 903.05 }
      ]
    }
  },
  {
    id: 18,
    categories: {
      'Desserts Menu': [
        { name: 'Cheesad eđus', price: 705.05 },
        { name: 'Tunra sprese', price: 905.05 },
        { name: 'Tinuce amiples', price: 905.06 },
        { name: 'Troisset outrics', price: 903.01 },
        { name: 'Krouth ciiras', price: 555.09 },
        { name: 'Eartlyniukintevies', price: 903.05 }
      ]
    }
  },
  {
    id: 19,
    categories: {
      'Light Bites': [
        { name: 'Croissant', price: 15.90 },
        { name: 'Bagels & Cheese', price: 11.50 },
        { name: 'Muffin', price: 11.50 },
        { name: 'Muffin', price: 23.10 },
        { name: 'Cookies', price: 22.90 },
        { name: 'Scone', price: 12.50 }
      ]
    }
  },
  {
    id: 20,
    categories: {
      'Coffee Menu': [
        { name: 'Espresso', price: 246.9 },
        { name: 'Capcucino', price: 248.9 },
        { name: 'Americano', price: 199.9 },
        { name: 'Ancchan', price: 179.9 },
        { name: 'Maxchato', price: 246.9 },
        { name: 'Mcchiato', price: 173.9 }
      ]
    }
  },
  {
    id: 21,
    categories: {
      'Non Coffee': [
        { name: 'Matcha Latte', price: 3.50 },
        { name: 'Hot Chocolate', price: 3.80 },
        { name: 'Iced Tea', price: 2.90 },
        { name: 'Fruit Tea', price: 3.20 },
        { name: 'Iced Berry Tea', price: 3.30 },
        { name: 'Milkshake', price: 3.90 }
      ]
    }
  },
  {
    id: 22,
    categories: {
      'Featured Items': [
        { name: 'Signature Blend', price: 4.50 },
        { name: 'Artisan Pastry', price: 3.50 }
      ]
    }
  }
];

templatesData.forEach((template) => {
  const tId = template.id;
  Object.keys(template.categories).forEach((catName, cIndex) => {
    const info = insertCat.run(catName, cIndex, tId);
    const catId = info.lastInsertRowid;
    
    const items = template.categories[catName];
    items.forEach((item, iIndex) => {
      insertItem.run(catId, item.name, item.price, iIndex, tId);
    });
  });
});

console.log("Reseeded database with template-specific categories and items!");
db.close();
