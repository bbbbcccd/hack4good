CREATE TABLE IF NOT EXISTS
  users (
    username VARCHAR(256) PRIMARY KEY,
    uPassword VARCHAR(256) NOT NULL,
    vouchers NUMERIC NOT NULL,
    phone_number NUMERIC NOT NULL
  );

INSERT INTO
  users (username, uPassword, vouchers, phone_number)
VALUES
  ('Alice', '1234', 123, 99999999),
  ('Bob', '123', 123, 99999999);
