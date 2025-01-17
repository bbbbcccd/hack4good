import express from 'express';

import * as UserController from '../controllers/userController.js';
import * as TaskController from '../controllers/taskController.js';
import * as TransactionController from '../controllers/transactionController.js';
import * as TaskCompletionController from '../controllers/taskCompletionController.js';
import * as MinimartController from '../controllers/minimartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// Add auth middleware
userRouter.use(authMiddleware('users'));

// Get user details
userRouter.get('/', UserController.getUserDetails);

// View transaction history
userRouter.get('/transaction', TransactionController.getUserTransactions);

// Create transaction

// Complete task
userRouter.post('/complete', TaskCompletionController.completeTask);

// View task completion history
userRouter.get('/complete', TaskCompletionController.getTasks);

// Purchase item
userRouter.post('/purchase', MinimartController.purchaseItem);

export default userRouter;