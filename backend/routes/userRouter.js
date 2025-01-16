import express from 'express';

import * as UserController from '../controllers/userController.js';
import * as TaskController from '../controllers/taskController.js';
import * as TaskCompletionController from '../controllers/taskCompletionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// Add auth middleware
userRouter.use(authMiddleware('users'));

// Get user details
userRouter.get('/', UserController.getUserDetails);

// View transaction history

// Create transaction

// Complete task
userRouter.post('/complete', TaskCompletionController.completeTask);

// View task completion history
userRouter.get('/complete', TaskCompletionController.getTasks);

export default userRouter;
