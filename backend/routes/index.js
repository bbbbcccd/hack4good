import express from 'express';
import { createUser, getUsers } from '../controllers/adminController.js';

import pool from '../database/db.js';

const indexRouter = express.Router();

indexRouter.get('/', getUsers);

indexRouter.post('/users', createUser);

indexRouter.get('/users', async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.send(response.rows);
});

export default indexRouter;
