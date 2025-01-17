import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import pool from '../database/db.js';

const createToken = (username, expiry) =>
  jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: expiry });

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Missing required fields.' });
  }

  const pw = (await pool.query('SELECT * FROM users WHERE username = $1', [username])).rows[0];

  if (!pw) {
    return res.status(400).json({ msg: 'Invalid user.' });
  }

  const isMatch = await bcrypt.compare(password, pw.password);

  console.log(pw);

  if (isMatch) {
    const token = createToken(username, '1d');
    return res
      .status(200)
      .json({ username, voucher: pw.vouchers, phoneNumber: pw.phone_number, token });
  }

  res.status(400).json({ msg: 'Incorrect password.' });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Missing required fields.' });
  }

  const pw = (await pool.query('SELECT password FROM admins WHERE username = $1', [username]))
    .rows[0];

  if (!pw) {
    return res.status(400).json({ msg: 'Invalid admin credentials.' });
  }

  const isMatch = await bcrypt.compare(password, pw.password);

  if (isMatch) {
    const token = createToken(username, '1d');
    return res.status(200).json({ username, token });
  }

  res.status(400).json({ msg: 'Incorrect password.' });
};
