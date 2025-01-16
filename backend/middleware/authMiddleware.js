import pool from '../database/db.js';
import jwt from 'jsonwebtoken';

const authMiddleware = (table) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization token required.' });
    }

    const token = authorization.split(' ')[1];
    const { JWT_SECRET } = process.env;

    try {
      const { username } = jwt.verify(token, JWT_SECRET);

      const data = await pool.query(`SELECT username FROM  ${table} WHERE username = $1`, [
        username,
      ]);

      if (data.rowCount === 0) {
        return res.status(403).json({ msg: 'Authorization token is invalid.' });
      }

      req.userId = data.rows[0].username;
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ msg: 'Authorization token is invalid.' });
    }
  };
};
export default authMiddleware;
