import express from "express";

import pool from "../database/db.js";

const indexRouter = express.Router();

indexRouter.get("/", async (req, res) => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)"
  );
  res.send("Success!");
});

indexRouter.post("/users", async (req, res) => {
  const { name, age } = req.body;
  const response = await pool.query(
    "INSERT INTO users (name, age) VALUES ($1, $2)",
    [name, age]
  );
  res.send("success");
});

indexRouter.get("/users", async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  res.send(response.rows);
});

export default indexRouter;
