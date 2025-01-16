import express from 'express';

import * as MinimartController from '../controllers/minimartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const minimartRouter = express.Router();

minimartRouter.get('/', MinimartController.getItems);

minimartRouter.get('/:id', MinimartController.getItem);

minimartRouter.patch('/:id', MinimartController.updateItem);

minimartRouter.delete('/:id', MinimartController.deleteItem);

minimartRouter.post('/', MinimartController.addItem);

export default minimartRouter;
