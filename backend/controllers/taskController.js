import pool from "../database/db.js";

export const createTask = async (req, res) => {
  const { name, reward } = req.body;

  if (!name || !reward) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  if (isNaN(reward) || reward < 0) {
    return res.status(400).json({ msg: "Invalid reward value" });
  }

  await pool
    .query("INSERT INTO tasks VALUES ($1, $2) RETURNING name, reward", [
      name,
      reward,
    ])
    .then((data) => res.send(data.rows[0]))
    .catch((err) =>
      res.status(400).json({ msg: "Error creating task", error: err.message })
    );
};

export const getTask = async (req, res) => {
  const { name } = req.body;
  const result = await pool.query("SELECT * FROM tasks WHERE name = $1", [
    name,
  ]);

  if (result.rows.length != 1) {
    res.status(400).json({ msg: "Invalid task" });
  }

  res.send(result.rows[0]);
};

export const updateTask = async (req, res) => {
  const { currentName, newName, newReward } = req.body;

  if (!currentName) {
    res.status(400).json({ msg: "Current task name is required." });
  }

  if (!newName && !newReward) {
    res.status(400).json({ msg: "At least one field must be updated." });
  }

  const currentTask = await pool.query("SELECT * FROM tasks WHERE name = $1", [
    currentName,
  ]);
  if (currentTask.rows.length === 0) {
    res.status(400).json({ msg: "Task not found" });
  }

  const { reward } = currentTask.rows[0];

  const result = await pool.query("UPDATE tasks SET $2, $3 WHERE name = $1", [
    currentName,
    newName || currentName,
    newReward || reward,
  ]);

  console.log(result);
  res.send(result);
};

export const deleteTask = async (req, res) => {
  const { name } = req;

  if (!name) {
    res.status(400).json({ msg: "Task name required" });
  }

  await pool
    .query("DELETE FROM tasks WHERE name = $1", [name])
    .then(() => res.send({ msg: "Task deleted successfully" }))
    .catch((err) =>
      res.status(400).json({ msg: "Error deleting task", error: err.message })
    );
};
