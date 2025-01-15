import express from "express";

import * as TaskController from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/", TaskController.getTask);

taskRouter.post("/", TaskController.createTask);

taskRouter.patch("/", TaskController.updateTask);

taskRouter.delete("/", TaskController.deleteTask);

taskRouter.post("/complete", TaskController.completeTask);

taskRouter.patch("/approve", TaskController.approveTask);

taskRouter.patch("/reject", TaskController.rejectTask);

export default taskRouter;
