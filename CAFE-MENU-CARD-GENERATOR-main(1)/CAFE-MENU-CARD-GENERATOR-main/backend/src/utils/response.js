const success = (res, data = null, message = 'Success', status = 200) => {
  return res.status(status).json({
    success: true,
    data,
    message
  });
};

const error = (res, message = 'Error', errorDetails = null, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    error: errorDetails
  });
};

module.exports = { success, error };
