/* eslint-disable camelcase */
import db from '../models/db';

const createdDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
/**
 * Displays, creates, updates or deletes of bookings
 * @class Bookings
 */

class BookingsController {
  /**
     * @static
     * @description this function displays all bank accounts
     * @param {object} request
     * @param {object} response the response body
     * @returns response
     * @memberof Trips
     */
  static async bookTrip(req, res) {
    try {
      const query = {
        text: 'insert into bookings1 (trip_id, seat_number, user_id, created_on) values ($1, $2, $3, $4) returning id, trip_id, seat_number, user_id, created_on',
        values: [
          req.body.trip_id,
          req.body.seat_number,
          req.user.id,
          createdDate,
        ],
      };
      const getTrip = {
        text: 'select * from trips1, buses where trips1.id = $1 AND trips1.busId = buses.id',
        values: [req.body.trip_id],
      };

      const result = await db.query(query);
      const booking = result.rows[0];
      const output = await db.query(getTrip);
      const trip = output.rows[0];

      return res.status(201).json({
        status: 'success',
        data: {
          booking_id: booking.id,
          user_id: req.user.id,
          trip_id: booking.trip_id,
          bus_id: trip.busId,
          trip_date: trip.trip_date,
          seat_number: req.body.seat_number,
          first_name: req.user.firstname,
          last_name: req.user.lastname,
          email: req.user.email,
        },
      });
    } catch (error) {
      return res.status(404)
        .json({
          status: 'error',
          error: error.message,
        });
    }
  }

  /**
   * @static
   * @description this function displays all bookings
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Booking
   */
  static async getAllBookings(req, res) {
    try {
      const query = req.user.is_admin === false ? {
        text: 'select * from bookings1 where user_id = $1',
        values: [req.user.id],
      } : {
        text: 'SELECT * FROM bookings1',
      };
      const result = await db.query(query);
      const bookings = result.rows;
      return res.status(201).json({
        status: 'success',
        data: bookings,
      });
    } catch (error) {
      return res.status(404)
        .json({
          status: 'error',
          error: error.message,
        });
    }
  }

  /**
   * @static
   * @description this function displays a booking
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Trips
   */
  static async getABooking(req, res) {
    try {
      return res.status(200).json({
        status: 'success',
        data: req.booking,
      });
    } catch (error) {
      return res.status(404)
        .json({
          status: 'error',
          error: error.message,
        });
    }
  }

  /**
   * @static
   * @description this function delete a booking
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Booking
   */
  static async deleteABooking(req, res) {
    try {
      const queryDelete = req.user.is_admin === true ? {
        text: 'DELETE from bookings1 where id = $1',
        values: [req.params.id],
      } : {
        text: 'DELETE from bookings1 where (user_id, id) = ($1, $2)',
        values: [req.user.id, req.params.id],
      };
      await db.query(queryDelete);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Booking Deleted Successfully',
        },
      });
    } catch (error) {
      return res.status(404)
        .json({
          status: 'error',
          error: error.message,
        });
    }
  }
}

export default BookingsController;
