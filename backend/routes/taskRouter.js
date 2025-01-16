import express from 'express';

import * as TaskController from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.get('/task', TaskController.getTask);

taskRouter.get('/tasks', TaskController.getTasks);

export default taskRouter;
