const db = require('../config/db');
const { success, error } = require('../utils/response');

const logExport = async (req, res) => {
  try {
    const { template_id, action } = req.body;
    
    await db.query('INSERT INTO activity_logs (action, description) VALUES ($1, $2)', [
      action || 'download',
      `Exported template ID: ${template_id}`
    ]);

    return success(res, null, 'Export logged successfully', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { logExport };
