import db from '../models/db';

const users = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

const trips = `CREATE TABLE IF NOT EXISTS trips(
    id SERIAL PRIMARY KEY,
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    bus_id INT,
    fare NUMERIC NOT NULL,
    FOREIGN KEY(bus_id) REFERENCES buses(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

const buses = `CREATE TABLE IF NOT EXISTS buses(
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR UNIQUE NOT NULL,
  manufacturer VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  year INT NOT NULL,
  capacity INT NOT NULL,
  status BUS_STATUS NOT NULL DEFAULT 'available',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

const bookings = `CREATE TABLE IF NOT EXISTS transactions(
    id serial PRIMARY KEY,
    seat_number integer NOT NULL,
    trip_id integer NOT NULL,
    user_id integer NOT NULL,
    created_on date NOT NULL
);`;
db.query(`${users} ${buses} ${trips}`, (error) => {
  if (error) {
    return console.error('error creating users table');
  }
  console.log('users table created successfully');
});

// db.query(trips, (error) => {
//   if (error) {
//     return console.error('error creating accounts table');
//   }
//   console.log('accounts table created successfully');
// });

// db.query(buses, (error) => {
//   if (error) {
//     return console.error('error creating transactions table');
//   }
//   console.log('transactions table created successfully');
// });

db.end();