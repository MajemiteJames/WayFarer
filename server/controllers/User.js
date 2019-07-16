/* eslint-disable camelcase */
import db from '../models/db';
import userAuth from './authController';
import '@babel/polyfill';

/**
 * @description This class handles user requests
 * @class User
 */
class User {
  /**
     * @static
     * @description this function creates a new user
     * @param {object} request the request body
     * @param {object} response the response body
     * @returns response
     * @memberof User
     */
  static async signUp(request, response) {
    const {
      first_name,
      last_name,
      password,
    } = request.body;

    let {
      email,
    } = request.body;
    email = email.toLowerCase();

    const hashedPassword = userAuth.hashPassword(password);
    const text = `INSERT INTO users(first_name, last_name, email, password, is_admin)
      VALUES($1, $2, $3, $4, $5) returning *;`;
    const values = [first_name, last_name, email, hashedPassword, true];

    try {
      const {
        rows,
      } = await db.query(text, values);
      const token = userAuth.generateToken(rows[0].id);

      return response.status(201).json({
        status: 'success',
        data: {
          token,
          id: rows[0].id,
          first_name: rows[0].firstname,
          last_name: rows[0].lastname,
          email: rows[0].email,
          is_admin: rows[0].is_admin,
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return response.status(400).json({
          status: 'error',
          error: 'User with that email already exists',
        });
      }
      return response.status(400).json({
        status: 'error',
        error: 'Inner Error',
      });
    }
  }

  /**
     * @static
     * @description this function signs in a user
     * @param {object} request the request body
     * @param {object} response the response body
     * @returns response
     * @memberof User
     */
  static async signIn(request, response) {
    const {
      password,
    } = request.body;
    const text = 'SELECT id, first_name, last_name, email, is_admin FROM users WHERE email = $1;';
    const passwordText = 'SELECT password FROM users WHERE email = $1;';

    let {
      email,
    } = request.body;
    email = email.toLowerCase();

    try {
      const {
        rows,
      } = await db.query(text, [email]);
      const hashedPasswordRow = await db.query(passwordText, [email]);
      const token = userAuth.generateToken(rows[0]);

      if (!rows[0]) {
        return response.status(404).json({
          status: 'success',
          error: 'User with that email does not exist',
        });
      }

      if (!userAuth.comparePassword(password, hashedPasswordRow.rows[0].password)) {
        return response.status(401).json({
          status: 'error',
          error: 'Incorrect password',
        });
      }
      return response.status(200).json({
        status: 200,
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          avatar: rows[0].avatar,
        },
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: 'Inner Error',
      });
    }
  }
}

export default User;
