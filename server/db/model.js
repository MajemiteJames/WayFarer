import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST;
} else {
  connectionString = process.env.DATABASE_URL;
}

const client = new Client({
  connectionString,
});

client.connect();

export default client;
