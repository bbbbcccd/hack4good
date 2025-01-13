CREATE TABLE IF NOT EXISTS
  users (
    username VARCHAR(256) PRIMARY KEY,
    password VARCHAR(256) NOT NULL,
    vouchers NUMERIC NOT NULL,
    phone_number NUMERIC NOT NULL
  );

CREATE TABLE IF NOT EXISTS
admins (
  username VARCHAR(256) PRIMARY KEY,
  password VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS
items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  cost NUMERIC NOT NULL CHECK (cost > 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 0)
);

CREATE TYPE TRANSACTION_STATUS AS ENUM ('paid', 'received', 'pre-ordered');

CREATE TABLE IF NOT EXISTS
transactions (
  status TRANSACTION_STATUS NOT NULL,
  date TIMESTAMP NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  item_id INTEGER REFERENCES items (id),
  username VARCHAR(256) REFERENCES users (username), 
  PRIMARY KEY (item_id, username)
);

CREATE TABLE IF NOT EXISTS
tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  reward NUMERIC NOT NULL
);

CREATE TYPE TASK_STATUS AS ENUM ('requested', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS 
task_completions (
  status TASK_STATUS NOT NULL,
  date TIMESTAMP NOT NULL,
  task_id INTEGER REFERENCES tasks (id),
  username VARCHAR(256) REFERENCES users (username)
);
