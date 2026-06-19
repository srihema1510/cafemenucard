const db = require('../config/db');
const { success, error } = require('../utils/response');

const getCafeInfo = (req, res) => {
  try {
    const cafe = db.prepare('SELECT id, cafe_name, updated_at FROM cafe_info WHERE id = 1').get();
    if (!cafe) {
      return error(res, 'Cafe info not found', null, 404);
    }
    return success(res, cafe, 'Cafe info retrieved successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const updateCafeInfo = (req, res) => {
  try {
    const { cafe_name } = req.body;
    db.prepare('UPDATE cafe_info SET cafe_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1').run(cafe_name);
    
    // Log the action
    db.prepare('INSERT INTO activity_logs (action, description) VALUES (?, ?)').run(
      'update_cafe',
      `Updated cafe name to ${cafe_name}`
    );

    return success(res, { cafe_name }, 'Cafe info updated successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { getCafeInfo, updateCafeInfo };
