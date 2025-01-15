-- Drop all existing tables and types
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_completions CASCADE;
DROP TYPE IF EXISTS TRANSACTION_STATUS CASCADE;
DROP TYPE IF EXISTS TASK_STATUS CASCADE;

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
  name VARCHAR(256) PRIMARY KEY,
  cost NUMERIC NOT NULL CHECK (cost > 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 0)
);

CREATE TYPE TRANSACTION_STATUS AS ENUM ('paid', 'received', 'pre-ordered');

CREATE TABLE IF NOT EXISTS
transactions (
  status TRANSACTION_STATUS NOT NULL,
  date TIMESTAMP NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  item_name VARCHAR(256) REFERENCES items (name),
  username VARCHAR(256) REFERENCES users (username),
  PRIMARY KEY (item_name, username)
);

CREATE TABLE IF NOT EXISTS
tasks (
  name VARCHAR(256) PRIMARY KEY,
  reward NUMERIC NOT NULL
);

CREATE TYPE TASK_STATUS AS ENUM ('requested', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS
task_completions (
  status TASK_STATUS NOT NULL,
  date TIMESTAMP NOT NULL,
  task_name VARCHAR(256) REFERENCES tasks (name),
  username VARCHAR(256) REFERENCES users (username),
  PRIMARY KEY (task_name, username)
);
