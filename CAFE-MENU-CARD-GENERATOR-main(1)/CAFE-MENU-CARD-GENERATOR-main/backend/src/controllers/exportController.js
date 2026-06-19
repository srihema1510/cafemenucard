const db = require('../config/db');
const { success, error } = require('../utils/response');

const logExport = (req, res) => {
  try {
    const { template_id, action } = req.body;
    
    db.prepare('INSERT INTO activity_logs (action, description) VALUES (?, ?)').run(
      action || 'download',
      `Exported template ID: ${template_id}`
    );

    return success(res, null, 'Export logged successfully', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { logExport };
