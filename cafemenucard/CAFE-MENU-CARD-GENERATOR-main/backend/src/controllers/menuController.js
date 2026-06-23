const db = require('../config/db');
const { success, error } = require('../utils/response');

const getMenuItems = async (req, res) => {
  try {
    const { category_id, template_id } = req.query;
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }

    let query = 'SELECT * FROM menu_items WHERE template_id = $1 ORDER BY display_order ASC';
    let params = [template_id];

    if (category_id) {
      query = 'SELECT * FROM menu_items WHERE template_id = $1 AND category_id = $2 ORDER BY display_order ASC';
      params = [template_id, category_id];
    }

    const itemsRes = await db.query(query, params);
    return success(res, itemsRes.rows, 'Menu items retrieved successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { category_id, item_name, price, display_order, template_id } = req.body;
    
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }
    
    // Check if category exists
    const categoryRes = await db.query('SELECT id FROM categories WHERE id = $1 AND template_id = $2', [category_id, template_id]);
    const category = categoryRes.rows[0];
    if (!category) return error(res, 'Category not found or does not belong to this template', null, 404);

    let order = display_order;
    if (order === undefined) {
      const maxOrderRes = await db.query('SELECT MAX(display_order) as max FROM menu_items WHERE category_id = $1', [category_id]);
      order = (parseInt(maxOrderRes.rows[0].max, 10) || 0) + 1;
    }

    const infoRes = await db.query('INSERT INTO menu_items (category_id, item_name, price, display_order, template_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [category_id, item_name, price, order, template_id]);
    const insertId = infoRes.rows[0].id;
    
    const newItemRes = await db.query('SELECT * FROM menu_items WHERE id = $1', [insertId]);
    return success(res, newItemRes.rows[0], 'Menu item created successfully', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, price, display_order, category_id } = req.body;

    const itemRes = await db.query('SELECT * FROM menu_items WHERE id = $1', [id]);
    const item = itemRes.rows[0];
    if (!item) return error(res, 'Not found', 'Menu item not found', 404);

    const updateCatId = category_id !== undefined ? category_id : item.category_id;
    const updateName = item_name !== undefined ? item_name : item.item_name;
    const updatePrice = price !== undefined ? price : item.price;
    const updateOrder = display_order !== undefined ? display_order : item.display_order;

    if (category_id !== undefined) {
      const categoryRes = await db.query('SELECT id FROM categories WHERE id = $1', [category_id]);
      const category = categoryRes.rows[0];
      if (!category) return error(res, 'Category not found', null, 404);
    }

    await db.query('UPDATE menu_items SET category_id = $1, item_name = $2, price = $3, display_order = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5', [updateCatId, updateName, updatePrice, updateOrder, id]);
    
    const updatedItemRes = await db.query('SELECT * FROM menu_items WHERE id = $1', [id]);
    return success(res, updatedItemRes.rows[0], 'Menu item updated successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRes = await db.query('DELETE FROM menu_items WHERE id = $1', [id]);
    
    if (deleteRes.rowCount === 0) {
      return error(res, 'Not found', 'Menu item not found', 404);
    }
    
    return success(res, null, 'Menu item deleted successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
