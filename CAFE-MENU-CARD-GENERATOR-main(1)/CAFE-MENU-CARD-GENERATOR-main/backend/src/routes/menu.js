const express = require('express');
const { body, query } = require('express-validator');
const { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.get('/',
  [
    query('template_id').isInt().withMessage('Valid template_id is required'),
    query('category_id').optional().isInt()
  ],
  validate,
  getMenuItems
);

router.post('/',
  authenticate,
  [
    body('category_id').isInt().withMessage('Valid category_id is required'),
    body('template_id').isInt().withMessage('Valid template_id is required'),
    body('item_name').notEmpty().withMessage('Item name is required').isLength({ max: 120 }),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('display_order').optional().isInt()
  ],
  validate,
  createMenuItem
);

router.put('/:id',
  authenticate,
  [
    body('category_id').optional().isInt(),
    body('item_name').optional().isLength({ max: 120 }),
    body('price').optional().isFloat({ min: 0 }),
    body('display_order').optional().isInt()
  ],
  validate,
  updateMenuItem
);

router.delete('/:id', authenticate, deleteMenuItem);

module.exports = router;
