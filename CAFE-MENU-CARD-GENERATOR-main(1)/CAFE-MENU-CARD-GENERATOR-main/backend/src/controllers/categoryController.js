const db = require('../config/db');
const { success, error } = require('../utils/response');

const getCategories = async (req, res) => {
  try {
    const { template_id } = req.query;
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }
    const categoriesRes = await db.query('SELECT * FROM categories WHERE template_id = $1 ORDER BY display_order ASC', [template_id]);
    return success(res, categoriesRes.rows, 'Categories retrieved successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, display_order, template_id } = req.body;
    
    if (!template_id) {
      return error(res, 'Bad Request', 'template_id is required', 400);
    }
    
    let order = display_order;
    if (order === undefined) {
      const maxOrderRes = await db.query('SELECT MAX(display_order) as max FROM categories WHERE template_id = $1', [template_id]);
      order = (parseInt(maxOrderRes.rows[0].max, 10) || 0) + 1;
    }

    const infoRes = await db.query('INSERT INTO categories (name, display_order, template_id) VALUES ($1, $2, $3) RETURNING id', [name, order, template_id]);
    const insertId = infoRes.rows[0].id;
    
    const newCategoryRes = await db.query('SELECT * FROM categories WHERE id = $1', [insertId]);
    return success(res, newCategoryRes.rows[0], 'Category created successfully', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, display_order } = req.body;

    const categoryRes = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    const category = categoryRes.rows[0];
    if (!category) return error(res, 'Not found', 'Category not found', 404);

    const updateName = name !== undefined ? name : category.name;
    const updateOrder = display_order !== undefined ? display_order : category.display_order;

    await db.query('UPDATE categories SET name = $1, display_order = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3', [updateName, updateOrder, id]);
    
    const updatedCategoryRes = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return success(res, updatedCategoryRes.rows[0], 'Category updated successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleteRes = await db.query('DELETE FROM categories WHERE id = $1', [id]);
    
    if (deleteRes.rowCount === 0) {
      return error(res, 'Not found', 'Category not found', 404);
    }
    
    return success(res, null, 'Category deleted successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
