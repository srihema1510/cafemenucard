const { validationResult } = require('express-validator');
const { error } = require('../utils/response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return first validation error message
    return error(res, 'Validation Error', errors.array()[0].msg, 400);
  }
  next();
};

module.exports = { validate };
