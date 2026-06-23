const express = require('express');
const { body } = require('express-validator');
const { getCafeInfo, updateCafeInfo } = require('../controllers/cafeController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.get('/', getCafeInfo);

router.put('/',
  authenticate,
  [
    body('cafe_name')
      .notEmpty().withMessage('Cafe name is required')
      .isLength({ max: 100 }).withMessage('Cafe name must be max 100 chars')
  ],
  validate,
  updateCafeInfo
);

module.exports = router;
