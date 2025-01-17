import pool from "../database/db.js";

export const getUserTransactions = async (req, res) => {
    if (!req.userId) {
        return res.status(400).json({ msg: 'Missing username' });
    }

    await pool
        .query('SELECT * FROM transactions WHERE username = $1', [req.userId])
        .then((data) => res.send(data.rows))
        .catch((err) => res.status(400).json({ msg: 'Error getting transactions', error: err.message }));
};