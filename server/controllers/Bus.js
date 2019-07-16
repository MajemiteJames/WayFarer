/* eslint-disable camelcase */
import db from '../models/db';
import isEmpty from '../middleware/validators/isEmpty';
import Helper from '../helper/helper';


/**
 * Displays, create bus
 * @class Bus endpoint
 */
class Bus {
  /**
   * @static
   * @description this function creates a bus data in the database
   * @param {object} request the request body
   * @param {object} response the response body
   * @returns response
   * @memberof Bus
   */
  static async createBus(request, response, next) {
    const {
      number_plate,
      manufacturer,
      model,
      year,
      capacity,
    } = request.body;
    if (isEmpty(number_plate) || isEmpty(capacity)) {
      return response.status(400).json({
        status: 'error',
        message: 'both number_plate and capacity are required',
      });
    }
    if (!Helper.isValidPlateNumber(request.body.number_plate)) {
      return response.status(400).send({
        message: 'Please enter a valid plate number',
      });
    }
    if (!request.user.is_admin) {
      return response.status(401).json({
        status: 'error',
        error: 'You do not have the authority to perform that operation',
      });
    }
    const text = `INSERT INTO buses(number_plate, manufacturer, model, year, capacity, status)
    VALUES($1, $2, $3, $4, $5, $6) returning * ;
    `;
    const values = [number_plate, manufacturer, model, year, capacity];
    try {
      const {
        rows,
      } = await db.query(text, values);
      return response.status(201).json({
        status: 201,
        data: [{
          id: rows[0].id,
          number_plate,
          manufacturer,
          model,
          year,
          capacity,
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: error.message,
      });
    }
  }

  /**
    *@description This function get buses
    * @static
    * @param {object} request the request parameters
    * @param {object} response the response body
    * @returns response
    * @memberof Bus
    */
  static async getBuses(request, response) {
    const {
      status,
    } = request.query;
    try {
      if (status) {
        const text = 'SELECT * FROM buses WHERE status = $1;';
        const value = [status];

        const {
          rows,
        } = await db.query(text, value);
        return response.status(200).json({
          status: 200,
          data: rows,
        });
      }
      const {
        rows,
      } = await db.query('SELECT * FROM buses;');

      return response.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: error.message,
      });
    }
  }

  /**
     * @static
     * @description this function updates the status of bus
     * @param {object} request the request object
     * @param {object} response the response body
     * @returns response
     * @memberof Bus
     */
  static async updateBus(request, response) {
    const {
      id,
    } = request.params;
    let {
      status,
    } = request.body;
    status = status.trim();

    const text = 'UPDATE buses SET status = $1 WHERE id = $2 returning *;';
    const values = [status, id];

    try {
      const {
        rows,
      } = await db.query(text, values);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'Cannot find that bus',
        });
      }

      return response.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          status: rows[0].status,
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default Bus;
