import express from "express";

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmins,
} from "../controllers/adminController.js";

import * as TaskController from "../controllers/taskController.js";

const adminRouter = express.Router();

adminRouter.get("/users", getUsers);

adminRouter.post("/users", createUser);

adminRouter.patch("/users/:id", updateUser);

adminRouter.delete("/users/:id", deleteUser);

adminRouter.post("/admin", createAdmin);

adminRouter.patch("/admin/:id", updateAdmin);

adminRouter.delete("/admin/:id", deleteAdmin);

// should be removed in the future
adminRouter.get("/admin", getAdmins);

adminRouter.get("/task", TaskController.getTask);

adminRouter.post("/task", TaskController.createTask);

adminRouter.patch("/task", TaskController.updateTask);

adminRouter.delete("/task", TaskController.deleteTask);

export default adminRouter;
