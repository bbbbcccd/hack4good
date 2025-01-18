import pool from "../database/db.js";

export const getUserDetails = async (req, res) => {
  if (!req.userId) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  await pool
    .query("SELECT username, vouchers FROM users WHERE username = $1", [req.userId])
    .then((data) => {
      if (data.rows.length != 1) {
        return res.status(400).json({ msg: "Invalid user" });
      }

      res.send(data.rows[0]);
    })
    .catch((err) =>
      res.status(400).json({ msg: "Error fetching user", error: err.message })
    );
};
