const db = require('../config/db');
const { success, error } = require('../utils/response');

const getCategories = (req, res) => {
  try {
    const { template_id } = req.query;
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }
    const categories = db.prepare('SELECT * FROM categories WHERE template_id = ? ORDER BY display_order ASC').all(template_id);
    return success(res, categories, 'Categories retrieved successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const createCategory = (req, res) => {
  try {
    const { name, display_order, template_id } = req.body;
    
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }
    
    let order = display_order;
    if (order === undefined) {
      const maxOrder = db.prepare('SELECT MAX(display_order) as max FROM categories WHERE template_id = ?').get(template_id);
      order = (maxOrder.max || 0) + 1;
    }

    const info = db.prepare('INSERT INTO categories (name, display_order, template_id) VALUES (?, ?, ?)').run(name, order, template_id);
    
    const newCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(info.lastInsertRowid);
    return success(res, newCategory, 'Category created successfully', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const updateCategory = (req, res) => {
  try {
    const { id } = req.params;
    const { name, display_order } = req.body;

    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    if (!category) return error(res, 'Not found', 'Category not found', 404);

    const updateName = name !== undefined ? name : category.name;
    const updateOrder = display_order !== undefined ? display_order : category.display_order;

    db.prepare('UPDATE categories SET name = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(updateName, updateOrder, id);
    
    const updatedCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    return success(res, updatedCategory, 'Category updated successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const deleteCategory = (req, res) => {
  try {
    const { id } = req.params;
    
    // SQLite with PRAGMA foreign_keys = ON will cascade delete menu_items
    const info = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    
    if (info.changes === 0) {
      return error(res, 'Not found', 'Category not found', 404);
    }
    
    return success(res, null, 'Category deleted successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
