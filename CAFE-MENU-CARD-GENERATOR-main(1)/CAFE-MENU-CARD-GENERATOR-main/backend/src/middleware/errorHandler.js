const { error } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Do not expose stack traces to client
  return error(res, 'Internal Server Error', 'Something went wrong', 500);
};

module.exports = { errorHandler };
