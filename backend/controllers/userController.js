import pool from "../database/db.js";

export const getUserDetails = async (req, res) => {
  const { username, password } = req.body;

  await pool
    .query("SELECT * FROM users WHERE username = $1 AND password = $2", [
      username,
      password,
    ])
    .then((data) => {
      if (data.rows.length != 1) {
        res.status(400).json({ msg: "Invalid user" });
      }

      res.send(data.rows[0]);
    })
    .catch((err) =>
      res.status(400).json({ msg: "Error fetching user", error: err.message })
    );
};
