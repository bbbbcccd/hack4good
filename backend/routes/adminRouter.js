import express from 'express';

import { createUser, getUsers, updateUser } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/users', getUsers);

adminRouter.post('/users', createUser);

adminRouter.patch('/users/:id', updateUser);

export default adminRouter;
