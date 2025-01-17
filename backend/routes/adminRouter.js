import express from 'express';

import * as AdminController from '../controllers/adminController.js';
import * as MinimartController from '../controllers/minimartController.js';
import * as TaskCompletionController from '../controllers/taskCompletionController.js';
import * as TaskController from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.use(authMiddleware('admins'));

// ******** user functions **********
adminRouter.get('/user', AdminController.getUsers);

adminRouter.post('/user', AdminController.createUser);

adminRouter.patch('/user/:id', AdminController.updateUser);

adminRouter.delete('/user/:id', AdminController.deleteUser);
// **********************************

// ******* admin functions **********
adminRouter.post('/admin', AdminController.createAdmin);

adminRouter.patch('/admin/:id', AdminController.updateAdmin);

adminRouter.delete('/admin/:id', AdminController.deleteAdmin);
// should be removed in the future
adminRouter.get('/admin', AdminController.getAdmins);
// **********************************

// ******* minimart functions *******
adminRouter.post('/minimart', MinimartController.addItem);

adminRouter.delete('/minimart/:id', MinimartController.deleteItem);

adminRouter.patch('/minimart/:id', MinimartController.updateItem);
// **********************************

// ******** task functions **********
adminRouter.get('/task/completion', TaskCompletionController.getTaskCompletions);

adminRouter.patch('/task/approve', TaskCompletionController.approveTask);

adminRouter.patch('/task/reject', TaskCompletionController.rejectTask);

adminRouter.post('/tasks', TaskController.createTask);

adminRouter.patch('/tasks', TaskController.updateTask);

adminRouter.delete('/tasks', TaskController.deleteTask);
// **********************************
export default adminRouter;
