import express from 'express';

import * as AdminController from '../controllers/adminController.js';
import * as MinimartController from '../controllers/minimartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.use(authMiddleware('admins'));

adminRouter.get('/users', AdminController.getUsers);

adminRouter.post('/users', AdminController.createUser);

adminRouter.patch('/users/:id', AdminController.updateUser);

adminRouter.post('/admin', AdminController.createAdmin);

adminRouter.delete('/users/:id', AdminController.deleteUser);

adminRouter.patch('/admin/:id', AdminController.updateAdmin);

adminRouter.delete('/admin/:id', AdminController.deleteAdmin);

// should be removed in the future
adminRouter.get('/admin', AdminController.getAdmins);

adminRouter.post('/admin/minimart', MinimartController.addItem);

adminRouter.delete('/admin/minimart/:id', MinimartController.deleteItem);

export default adminRouter;
