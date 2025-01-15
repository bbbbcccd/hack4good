import express from "express";

import * as TaskController from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/", TaskController.getTask);

taskRouter.post("/", TaskController.createTask);

taskRouter.patch("/", TaskController.updateTask);

taskRouter.delete("/", TaskController.deleteTask);

export default taskRouter;
