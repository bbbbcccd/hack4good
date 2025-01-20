import pool from "../database/db.js";

// CRUD operations on task_completions
// At any point in time, each task can only be in requested status up to 1 time for each user

// TODO: Provide filters for getting voucher task completions
export const getTaskCompletions = async (req, res) => {
  await pool
    .query("SELECT * FROM task_completions")
    .then((data) => res.send(data.rows))
    .catch((err) =>
      res
        .status(400)
        .json({ msg: "Error getting task completions", error: err.message })
    );
};

export const getUserTaskCompletions = async (req, res) => {
  if (!req.userId) {
    return res.status(400).json({ msg: 'Missing username' });
  }

  await pool
    .query("SELECT * FROM task_completions WHERE username = $1", [req.userId])
    .then((data) => res.send(data.rows))
    .catch((err) =>
      res
        .status(400)
        .json({ msg: "Error getting task completions", error: err.message })
    );
};

export const completeTask = async (req, res) => {
  const { taskName, username } = req.body;

  if (!taskName || !username) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (user.rows.length == 0) {
    return res.status(400).json({ msg: "Invalid username" });
  }

  const task = await pool.query("SELECT * FROM tasks WHERE name = $1", [
    taskName,
  ]);
  if (task.rows.length == 0) {
    return res.status(400).json({ msg: "Invalid task" });
  }

  const completedTasks = await pool.query(
    "SELECT * FROM task_completions WHERE task_name = $1 AND username = $2 AND status = 'requested'",
    [taskName, username]
  );

  if (completedTasks.rows.length > 0) {
    return res.status(400).json({ msg: "Task is already processing" });
  }

  await pool
    .query(
      "INSERT INTO task_completions VALUES ('requested', NOW(), $1, $2) RETURNING status, date, task_name, username",
      [taskName, username]
    )
    .then((data) => res.send(data.rows[0]))
    .catch((err) =>
      res.status(400).json({ msg: "Error completing task", error: err.message })
    );
};

export const approveTask = async (req, res) => {
  const { taskName, username } = req.body;

  if (!taskName || !username) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  let user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (user.rows.length == 0) {
    return res.status(400).json({ msg: "Invalid username" });
  }

  let task = await pool.query("SELECT * FROM tasks WHERE name = $1", [
    taskName,
  ]);
  if (task.rows.length == 0) {
    return res.status(400).json({ msg: "Invalid task" });
  }
  const taskReward = task.rows[0].reward;

  const completedTasks = await pool.query(
    "SELECT * FROM task_completions WHERE task_name = $1 AND username = $2 AND status = 'requested'",
    [taskName, username]
  );

  if (completedTasks.rows.length == 0) {
    return res.status(400).json({ msg: "Task completion not found" });
  }

  // insert into task_completion, increase user balance by task reward
  try {
    await pool.query('BEGIN')
    await pool.query("UPDATE users SET vouchers = vouchers + $1 WHERE username = $2;", [taskReward, username]);
    const data = await pool
      .query(
        "UPDATE task_completions SET status = 'approved' WHERE task_name = $1 AND username = $2 RETURNING status, date, task_name, username",
        [taskName, username]
      )
    await pool.query('COMMIT');

    res.send(data.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    return res.status(400).json({ msg: "Error approving task", error: err.message })
  }
};

// TODO: Notify users when task is rejected
export const rejectTask = async (req, res) => {
  const { taskName, username } = req.body;

  if (!taskName || !username) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  let user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (user.rows.length == 0) {
    return res.status(400).json({ msg: "Invalid username" });
  }

  let task = await pool.query("SELECT * FROM tasks WHERE name = $1", [
    taskName,
  ]);
  if (task.rows.length == 0) {
    return res.status(400).json({ msg: "Invalid task" });
  }

  const completedTasks = await pool.query(
    "SELECT * FROM task_completions WHERE task_name = $1 AND username = $2 AND status = 'requested'",
    [taskName, username]
  );

  if (completedTasks.rows.length == 0) {
    return res.status(400).json({ msg: "Task not found" });
  }

  await pool
    .query(
      "UPDATE task_completions SET status = 'requested' WHERE task_name = $1 AND username = $2 RETURNING status, date, task_name, username",
      [taskName, username]
    )
    .then((data) => res.send(data.rows[0]))
    .catch((err) =>
      res.status(400).json({ msg: "Error completing task", error: err.message })
    );
};
