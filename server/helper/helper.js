/* eslint-disable max-len */
/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dotenv = require('dotenv');

dotenv.config();

const Helper = {
  /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     * https: //www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-postgresql-db-and-jwt-3-mke10c5c5
     */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
     * isValidEmail helper method
     * @param {string} email
     * @returns {Boolean} True or False
     */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * isValidEmail helper method
   * @param {string} plate_number
   * @returns {Boolean} True or False
   * https: //stackoverflow.com/questions/6386300/want-a-regex-for-validating-indian-vehicle-number-format
   */
  isValidPlateNumber(plate_number) {
    return /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}/.test(plate_number);
  },
  /**
     * Gnerate Token
     * @param {string} id
     * @returns {string} token
     */
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, {
      expiresIn: '7d',
    });
    return token;
  },
};

export default Helper;
