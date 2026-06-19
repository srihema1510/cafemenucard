const morgan = require('morgan');

// Exporting simple morgan dev logger for express
const logger = morgan('dev');

module.exports = logger;
