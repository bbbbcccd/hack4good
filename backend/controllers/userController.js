import express from "express";

import pool from "../database/db.js";

export const getUserDetails = async (req, res) => {
  const username = req.username;
  const password = req.password;

  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password]
  );
  if (result.length != 1) {
    res.status(400).end("Invalid user");
  }

  res.status(200).send(result.rows[0]);
};
