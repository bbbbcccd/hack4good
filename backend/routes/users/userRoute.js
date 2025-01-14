import express from "express";

import * as UserController from "../../controllers/userController.js";

const userRouter = express.Router();

// Add auth middleware

// Get user details
userRouter.get("/", UserController.getUserDetails);

// View transaction history

// Create transaction

// View tasks

// Complete task

// View task completion history

indexRouter.get("/", async (req, res) => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)"
  );
  res.send("Success!");
});

export default userRouter;
