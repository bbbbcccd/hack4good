import pool from '../database/db.js';

export const getItems = async (req, res) => {
  await pool
    .query('SELECT * FROM items')
    .then((data) => res.send(data.rows))
    .catch((err) => res.status(400).json({ msg: 'Error fetching items', error: err.message }));
};

export const getItem = async (req, res) => {
  const { id } = req.params;

  await pool
    .query('SELECT * FROM items WHERE name = $1', [id])
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error fetching item', error: err.message }));
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  await pool
    .query('DELETE FROM items WHERE name = $1', [id])
    .then(() => res.send({ msg: 'Item deleted successfully.' }))
    .catch((err) => res.status(400).json({ msg: 'Error deleting item.', error: err.message }));
};

export const addItem = async (req, res) => {
  const { name, cost, quantity } = req.body;

  if (!name || !cost || !quantity) {
    return res.status(400).json({ msg: 'Name, cost, and quantity are required.' });
  }

  await pool
    .query('INSERT INTO items (name, cost, quantity) VALUES ($1, $2, $3) RETURNING *', [
      name,
      cost,
      quantity,
    ])
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error adding item.', error: err.message }));
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, cost, quantity } = req.body;

  if (!id) {
    return res.status(400).json({ msg: 'Item ID (name) is required.' });
  }

  const updatedFields = [];
  const values = [];
  let idx = 1;

  if (name) {
    updatedFields.push(`name = $${idx++}`);
    values.push(name);
  }

  if (cost) {
    updatedFields.push(`cost = $${idx++}`);
    values.push(cost);
  }

  if (quantity) {
    updatedFields.push(`quantity = $${idx++}`);
    values.push(quantity);
  }

  if (updatedFields.length === 0) {
    return res.status(400).json({ msg: 'At least one field must be updated.' });
  }

  values.push(id);

  await pool
    .query(`UPDATE items SET ${updatedFields.join(', ')} WHERE name = $${idx} RETURNING *`, values)
    .then((data) => res.send(data.rows[0]))
    .catch((err) => res.status(400).json({ msg: 'Error updating item.', error: err.message }));
};

export const purchaseItem = async (req, res) => {
  const { username, itemName, quantity } = req.body;

  if (!username || !itemName || !quantity) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ msg: 'Invalid item quantity' });
  }

  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (user.rows.length == 0) {
    return res.status(400).json({ msg: 'Invalid username' });
  }

  const item = await pool.query('SELECT * FROM items WHERE name = $1', [itemName]);
  if (item.rows.length == 0) {
    return res.status(400).json({ msg: 'Invalid item' });
  }
  const cost = item.rows[0].cost;

  try {
    await pool.query('BEGIN')
    await pool.query("UPDATE items SET quantity = quantity - $1 WHERE name = $2;", [quantity, itemName]);
    await pool.query("UPDATE users SET vouchers = vouchers - $1 WHERE username = $2;", [quantity * cost, username]);
    const data = await pool.query("INSERT INTO transactions (status, date, quantity, item_name, username) VALUES ('paid', NOW(), $1, $2, $3) RETURNING *", [quantity, itemName, username]);
    await pool.query('COMMIT');

    res.send(data.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    return res.status(400).json({ msg: "Error purchasing item ", error: err.message })
  }
};
