const express = require('express');
const { body, query } = require('express-validator');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.get('/',
  [
    query('template_id').isInt().withMessage('Valid template_id is required')
  ],
  validate,
  getCategories
);

router.post('/',
  authenticate,
  [
    body('name').notEmpty().withMessage('Category name is required').isLength({ max: 80 }).withMessage('Category name must be max 80 chars'),
    body('display_order').optional().isInt(),
    body('template_id').isInt().withMessage('Valid template_id is required')
  ],
  validate,
  createCategory
);

router.put('/:id',
  authenticate,
  [
    body('name').optional().isLength({ max: 80 }).withMessage('Category name must be max 80 chars'),
    body('display_order').optional().isInt()
  ],
  validate,
  updateCategory
);

router.delete('/:id', authenticate, deleteCategory);

module.exports = router;
