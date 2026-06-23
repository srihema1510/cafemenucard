const db = require('../config/db');
const { success, error } = require('../utils/response');

const getCafeInfo = async (req, res) => {
  try {
    const cafeRes = await db.query('SELECT id, cafe_name, updated_at FROM cafe_info WHERE id = 1');
    const cafe = cafeRes.rows[0];
    if (!cafe) {
      return error(res, 'Cafe info not found', null, 404);
    }
    return success(res, cafe, 'Cafe info retrieved successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const updateCafeInfo = async (req, res) => {
  try {
    const { cafe_name } = req.body;
    await db.query('UPDATE cafe_info SET cafe_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [cafe_name]);
    
    // Log the action
    await db.query('INSERT INTO activity_logs (action, description) VALUES ($1, $2)', [
      'update_cafe',
      `Updated cafe name to ${cafe_name}`
    ]);

    return success(res, { cafe_name }, 'Cafe info updated successfully');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

module.exports = { getCafeInfo, updateCafeInfo };
