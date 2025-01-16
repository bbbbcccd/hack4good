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

  const password = await bcrypt.hash(unhashedPw, SALT_RNDS);

  await pool
    .query('INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING username, vouchers, phone_number', [
      username,
      password,
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
    return res.status(400).json({ msg: 'User ID (username) is required.' });
  }

  const updatedFields = [];
  const values = [];
  let idx = 1;

  if (username) {
    updatedFields.push(`username = $${idx++}`);
    values.push(username);
  }

  if (unhashedPw) {
    const password = await bcrypt.hash(unhashedPw, SALT_RNDS);
    updatedFields.push(`password = $${idx++}`);
    values.push(password);
  }

  if (vouchers) {
    updatedFields.push(`vouchers = $${idx++}`);
    values.push(vouchers);
  }

  if (phoneNumber) {
    updatedFields.push(`phone_number = $${idx++}`);
    values.push(phoneNumber);
  }

  if (updatedFields.length === 0) {
    return res.status(400).json({ msg: 'At least one field must be updated.' });
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

/**
 * Deletes a user from the database.
 *
 * Deletes the user with the given `id` from the database.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the user to delete.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ msg: 'User ID (username) is required.' });
  }

  await pool
    .query('DELETE FROM users WHERE username = $1', [id])
    .then(() => res.send({ msg: 'User deleted successfully.' }))
    .catch((err) => res.status(400).json({ msg: 'Error deleting user.', error: err.message }));
};

/**
 * Creates a new admin in the database.
 *
 * Retrieves the username of the newly created admin from the database and sends it as a response.
 *
 * @async
 * @function createAdmin
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The request body containing updatedFields to update
 * @param {string} [req.body.username] - The new username for the admin.
 * @param {string} [req.body.unhashedP
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response containing admin data or an error message.
 */
export const createAdmin = async (req, res) => {
  const { username, unhashedPw } = req.body;

  if (!username || !unhashedPw) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  const password = await bcrypt.hash(unhashedPw, SALT_RNDS);

  await pool
    .query('INSERT INTO admins VALUES ($1, $2) RETURNING username', [username, password])
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error creating admin', error: err.message }));
};

/**
 * Updates an admin's information in the database.
 *
 * Updates the specified fields (`username`, `password`) for the admin with the given `id`.
 * If the password is provided, it is hashed before updating the database.
 *
 * @async
 * @function updateAdmin
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the admin to update.
 * @param {Object} req.body - The request body containing fields to update.
 * @param {string} [req.body.username] - The new username for the admin.
 * @param {string} [req.body.unhashedP
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response containing admin data or an error message.
 */
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, unhashedPw } = req.body;

  if (!id) {
    return res.status(400).json({ msg: 'Admin ID (username) is required.' });
  }

  const updatedFields = [];
  const values = [];
  let idx = 1;

  if (username) {
    updatedFields.push(`username = $${idx++}`);
    values.push(username);
  }

  if (unhashedPw) {
    const password = await bcrypt.hash(unhashedPw, SALT_RNDS);
    updatedFields.push(`password = $${idx++}`);
    values.push(password);
  }

  if (updatedFields.length === 0) {
    return res.status(400).json({ msg: 'At least one field must be updated.' });
  }

  values.push(id);

  await pool
    .query(
      `UPDATE admins SET ${updatedFields.join(', ')} WHERE username = $${idx} RETURNING username`,
      values,
    )
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error updating admin.', error: err.message }));
};

/**
 * Deletes the admin with the given `id` from the database.
 *
 * @async
 * @function deleteAdmin
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the admin to delete.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 */
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: 'Admin ID (username) is required.' });
  }

  await pool
    .query('DELETE FROM admins WHERE username = $1', [id])
    .then(() => res.send({ msg: 'Admin deleted successfully.' }))
    .catch((err) => res.status(400).json({ msg: 'Error deleting admin.', error: err.message }));
};

// should be removed in the future
export const getAdmins = async (req, res) => {
  await pool
    .query('SELECT username FROM admins')
    .then((data) => res.send(data.rows))
    .catch((err) => res.status(400).json({ msg: 'Error fetching admins', error: err.message }));
};
