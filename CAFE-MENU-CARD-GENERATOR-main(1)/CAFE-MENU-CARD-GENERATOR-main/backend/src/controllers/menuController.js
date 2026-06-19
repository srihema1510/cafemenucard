const db = require('../config/db');
const { success, error } = require('../utils/response');

const getMenuItems = (req, res) => {
  try {
    const { category_id, template_id } = req.query;
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }

    let query = 'SELECT * FROM menu_items WHERE template_id = ? ORDER BY display_order ASC';
    let params = [template_id];

    if (category_id) {
      query = 'SELECT * FROM menu_items WHERE template_id = ? AND category_id = ? ORDER BY display_order ASC';
      params = [template_id, category_id];
    }

    const items = db.prepare(query).all(...params);
    return success(res, items, 'Menu items retrieved successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const createMenuItem = (req, res) => {
  try {
    const { category_id, item_name, price, display_order, template_id } = req.body;
    
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }
    
    // Check if category exists
    const category = db.prepare('SELECT id FROM categories WHERE id = ? AND template_id = ?').get(category_id, template_id);
    if (!category) return error(res, 'Category not found or does not belong to this template', null, 404);

    let order = display_order;
    if (order === undefined) {
      const maxOrder = db.prepare('SELECT MAX(display_order) as max FROM menu_items WHERE category_id = ?').get(category_id);
      order = (maxOrder.max || 0) + 1;
    }

    const info = db.prepare('INSERT INTO menu_items (category_id, item_name, price, display_order, template_id) VALUES (?, ?, ?, ?, ?)').run(category_id, item_name, price, order, template_id);
    
    const newItem = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(info.lastInsertRowid);
    return success(res, newItem, 'Menu item created successfully', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const updateMenuItem = (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, price, display_order, category_id } = req.body;

    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
    if (!item) return error(res, 'Not found', 'Menu item not found', 404);

    const updateCatId = category_id !== undefined ? category_id : item.category_id;
    const updateName = item_name !== undefined ? item_name : item.item_name;
    const updatePrice = price !== undefined ? price : item.price;
    const updateOrder = display_order !== undefined ? display_order : item.display_order;

    if (category_id !== undefined) {
      const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(category_id);
      if (!category) return error(res, 'Category not found', null, 404);
    }

    db.prepare('UPDATE menu_items SET category_id = ?, item_name = ?, price = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(updateCatId, updateName, updatePrice, updateOrder, id);
    
    const updatedItem = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
    return success(res, updatedItem, 'Menu item updated successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const deleteMenuItem = (req, res) => {
  try {
    const { id } = req.params;
    const info = db.prepare('DELETE FROM menu_items WHERE id = ?').run(id);
    
    if (info.changes === 0) {
      return error(res, 'Not found', 'Menu item not found', 404);
    }
    
    return success(res, null, 'Menu item deleted successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
