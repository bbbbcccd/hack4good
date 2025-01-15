import express from 'express';

import * as MinimartController from '../controllers/minimartController.js';

const minimartRouter = express.Router();

minimartRouter.get('/', MinimartController.getItems);

minimartRouter.get('/:id', MinimartController.getItem);

minimartRouter.patch('/:id', MinimartController.updateItem);

export default minimartRouter;
