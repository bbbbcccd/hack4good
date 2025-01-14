import pool from '../database/db.js';
import * as bcrypt from 'bcrypt';

// will have future changes when add authentication

const SALT_RNDS = 11;

/**
 * Fetches a list of users from the database.
 *
 * Retrieves the `username`, `vouchers`, and `phone_number` of all users
 * from the database and sends it as a response.
 *
 * @async
 * @function getUsers
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response containing user data or an error message.
 */
export const getUsers = async (req, res) => {
  await pool
    .query('SELECT username, vouchers, phone_number FROM Users')
    .then((data) => res.send(data.rows))
    .catch((err) => res.status(400).json({ msg: 'Error fetching users', error: err.message }));
};

/**
 * Creates a new user in the database.
 *
 * Retrieves the `username`, `vouchers`, and `phone_number` of newly created user
 * from the database and sends it as a response.
 *
 * @async
 * @function createUser
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The request body containing updatedFields to update
 * @param {string} [req.body.username] - The new username for the user.
 * @param {string} [req.body.unhashedPw] - The new unhashed password for the user.
 * @param {number} [req.body.vouchers] - The new vouchers value for the user.
 * @param {string} [req.body.phoneNumber] - The new phone number for the user..
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response containing user data or an error message.
 */
export const createUser = async (req, res) => {
  const { username, unhashedPw, vouchers, phoneNumber } = req.body;

  if (!username || !unhashedPw || !phoneNumber) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  const password = bcrypt.hash(unhashedPw, SALT_RNDS);

  await pool
    .query('INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING username, vouchers, phone_number', [
      username,
      unhashedPw,
      vouchers || 0,
      phoneNumber,
    ])
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error creating user', error: err.message }));
};

/**
 * Updates a user's information in the database.
 *
 * Updates the specified fields (`username`, `password`, `vouchers`, `phone_number`)
 * for the user with the given `id`. If the password is provided, it is hashed before
 * updating the database.
 *
 * @async
 * @function updateUser
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} req.body - The request body containing fields to update.
 * @param {string} [req.body.username] - The new username for the user.
 * @param {string} [req.body.unhashedPw] - The new unhashed password for the user.
 * @param {number} [req.body.vouchers] - The new vouchers value for the user.
 * @param {string} [req.body.phoneNumber] - The new phone number for the user.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, unhashedPw, vouchers, phoneNumber } = req.body;

  if (!id) {
    res.status(400).json({ msg: 'User ID (username) is required.' });
  }
  console.log(id);

  const updatedFields = [];
  const values = [];
  let idx = 1;

  if (username) {
    updatedFields.push(`username = $${idx++}`);
    values.push(username);
  }

  if (unhashedPw) {
    const hashedPassword = await bcrypt.hash(unhashedPw, SALT_RNDS);
    updatedFields.push(`password = $${idx++}`);
    values.push(hashedPassword);
  }

  if (vouchers) {
    updatedFields.push(`vouchers = $${idx++}`);
    values.push(vouchers);
  }

  if (phoneNumber) {
    updatedFields.push(`phone_number = $${idx++}`);
    values.push(phoneNumber);
  }

  values.push(id);

  await pool
    .query(
      `UPDATE users SET ${updatedFields.join(
        ', ',
      )} WHERE username = $${idx} RETURNING username, vouchers, phone_number`,
      values,
    )
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error updating user.', error: err.message }));
};

export const deleteUser = () => {};
