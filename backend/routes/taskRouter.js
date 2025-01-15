import express from "express";

import * as TaskController from "../controllers/taskController.js";
import * as TaskCompletionController from "../controllers/taskCompletionController.js";

const taskRouter = express.Router();

taskRouter.get("/", TaskController.getTask);

taskRouter.post("/", TaskController.createTask);

taskRouter.patch("/", TaskController.updateTask);

taskRouter.delete("/", TaskController.deleteTask);

taskRouter.get("/complete", TaskCompletionController.getTasks);

taskRouter.post("/complete", TaskCompletionController.completeTask);

taskRouter.patch("/approve", TaskCompletionController.approveTask);

taskRouter.patch("/reject", TaskCompletionController.rejectTask);

export default taskRouter;
