import express from 'express';

import * as MinimartController from '../controllers/minimartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const minimartRouter = express.Router();

minimartRouter.get('/', MinimartController.getItems);

minimartRouter.get('/:id', MinimartController.getItem);

export default minimartRouter;
