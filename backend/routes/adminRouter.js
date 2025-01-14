import express from "express";

import * as AdminController from "../controllers/adminController.js";
import * as TaskController from "../controllers/taskController.js";
import * as MinimartController from "../controllers/minimartController.js";

const adminRouter = express.Router();

adminRouter.get("/users", AdminController.getUsers);

adminRouter.post("/users", AdminController.createUser);

adminRouter.patch("/users/:id", AdminController.updateUser);

adminRouter.delete("/users/:id", AdminController.deleteUser);

adminRouter.post("/admin", AdminController.createAdmin);

adminRouter.patch("/admin/:id", AdminController.updateAdmin);

adminRouter.delete("/admin/:id", AdminController.deleteAdmin);

// should be removed in the future
adminRouter.get("/admin", AdminController.getAdmins);

adminRouter.get("/task", TaskController.getTask);

adminRouter.post("/task", TaskController.createTask);

adminRouter.patch("/task", TaskController.updateTask);

adminRouter.delete("/task", TaskController.deleteTask);

adminRouter.post("/admin/minimart", MinimartController.addItem);

adminRouter.delete("/admin/minimart/:id", MinimartController.deleteItem);

export default adminRouter;
