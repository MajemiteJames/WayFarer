import db from '../models/db';

const users = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
);`;

db.query(users, (error) => {
  if (error) {
    return console.error('error creating users table');
  }
  console.log('users table created successfully');
});

db.end();
