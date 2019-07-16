/* eslint-disable camelcase */
import db from '../models/db';
import isEmpty from '../middleware/validators/isEmpty';

/**
 * Displays, creates, updates or deletes an trip
 * @class Trips
 */

class Trips {
  /**
   * @static
   * @description this function displays all bank accounts
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Trips
   */
  static async getTrips(request, response) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM trips;');

      return response.status(200).json({
        status: 200,
        data:
          rows,
      });
    } catch (error) {
      return response.status(400).json({
        status: error,
        error: error.message,
      });
    }
  }

  /**
     * @static
     * @description this function creates a new trips
     * @param {object} request the request body
     * @param {object} response the response body
     * @returns response
     * @memberof Trips
     */
  static async createTrips(request, response, next) {
    const {
      bus_id,
      origin,
      destination,
      trip_date,
      fare,
    } = request.body;
    let {
      status,
    } = request.body;
    if (
      isEmpty(bus_id)
        || isEmpty(origin)
        || isEmpty(destination)
        || isEmpty(trip_date)
        || isEmpty(fare)
    ) {
      return response.status(400).json({
        status: 'error',
        message: 'All the fields are required except status field',
      });
    }
    if (!request.user.is_admin) {
      return response.status(401).json({
        status: 'error',
        error: 'You do not have the authority to perform that operation',
      });
    }

    status = isEmpty(status) ? 'pending' : status;
    const text = `INSERT INTO trips1(busId, origin, destination, fare, tripdate, status) 
    VALUES($1, $2, $3, $4, $5, $6) returning * ;
    `;
    const values = [bus_id, origin, destination, fare, trip_date, status];
    try {
      const {
        rows,
      } = await db.query(text, values);
      return response.status(201).json({
        status: 201,
        data: {
          trip_id: rows[0].id,
          bus_id,
          origin,
          destination,
          fare,
          trip_date,
          status,
        },
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
    * @description this function updates the status of a trip
    * @param {object} request the request object
    * @param {object} response the response body
    * @returns response
    * @memberof Trips
    */
  static async updateTrip(request, response) {
    const {
      id,
    } = request.params;
    const {
      status,
    } = request.body;

    const text = 'UPDATE trips1 SET status = $1 WHERE id = $2 returning *;';
    const values = [status, id];
    try {
      const {
        rows,
      } = await db.query(text, values);

      if (!rows[0]) {
        return response.status(404).json({
          status: 'error',
          error: 'Cannot find that trip',
        });
      }

      return response.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          status: rows[0].status,
          message: 'Trip cancelled successfully',
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

export default Trips;
