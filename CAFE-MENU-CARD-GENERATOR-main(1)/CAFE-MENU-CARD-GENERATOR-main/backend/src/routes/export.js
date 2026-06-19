const express = require('express');
const { body } = require('express-validator');
const { logExport } = require('../controllers/exportController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.post('/log',
  authenticate,
  [
    body('template_id').notEmpty().withMessage('template_id is required'),
    body('action').optional().isString()
  ],
  validate,
  logExport
);

module.exports = router;
