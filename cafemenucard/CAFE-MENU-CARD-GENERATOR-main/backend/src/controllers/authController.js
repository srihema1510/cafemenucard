const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateTokens, verifyAccessToken } = require('../config/jwt');
const { success, error } = require('../utils/response');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminRes = await db.query('SELECT * FROM admin WHERE email = $1', [email]);
    const admin = adminRes.rows[0];

    if (!admin) {
      return error(res, 'Invalid credentials', 'User not found', 401);
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return error(res, 'Invalid credentials', 'Incorrect password', 401);
    }

    const tokens = generateTokens(admin);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return success(res, { id: admin.id, email: admin.email }, 'Login successful');
  } catch (err) {
    console.error(err);
    return error(res, 'Internal Server Error', null, 500);
  }
};

const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return success(res, null, 'Logged out successfully');
};

const getProfile = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(200).json({ success: false, message: 'No token provided' });
  }

  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(200).json({ success: false, message: 'Invalid or expired token' });
  }

  const { id, email } = user;
  return success(res, { id, email }, 'Profile fetched successfully');
};

module.exports = { login, logout, getProfile };
