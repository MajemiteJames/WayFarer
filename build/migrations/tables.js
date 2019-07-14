"use strict";

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = "CREATE TABLE IF NOT EXISTS users(\n    id SERIAL PRIMARY KEY,\n    firstname VARCHAR NOT NULL,\n    lastname VARCHAR NOT NULL,\n    email VARCHAR UNIQUE NOT NULL,\n    password TEXT NOT NULL,\n    is_admin BOOLEAN NOT NULL,\n    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);";
var trips = "CREATE TABLE IF NOT EXISTS trips(\n    id SERIAL PRIMARY KEY,\n    origin VARCHAR NOT NULL,\n    destination VARCHAR NOT NULL,\n    bus_id INT,\n    fare NUMERIC NOT NULL,\n    FOREIGN KEY(bus_id) REFERENCES buses(id) ON DELETE SET NULL,\n    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n);";
var buses = "CREATE TABLE IF NOT EXISTS transactions(\n  id SERIAL PRIMARY KEY,\n  number_plate VARCHAR UNIQUE NOT NULL,\n  manufacturer VARCHAR NOT NULL,\n  model VARCHAR NOT NULL,\n  year INT NOT NULL,\n  capacity INT NOT NULL,\n  status BUS_STATUS NOT NULL DEFAULT 'available',\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);";

_db["default"].query(users, function (error) {
  if (error) {
    return console.error('error creating users table');
  }

  console.log('users table created successfully');
});

_db["default"].query(trips, function (error) {
  if (error) {
    return console.error('error creating accounts table');
  }

  console.log('accounts table created successfully');
});

_db["default"].query(buses, function (error) {
  if (error) {
    return console.error('error creating transactions table');
  }

  console.log('transactions table created successfully');
});

_db["default"].end();