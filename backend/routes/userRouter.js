import express from "express";

import * as UserController from "../controllers/userController.js";

const userRouter = express.Router();

// Add auth middleware

// Get user details
userRouter.get("/", UserController.getUserDetails);

// View transaction history

// Create transaction

// View tasks

// Complete task

// View task completion history

export default userRouter;
