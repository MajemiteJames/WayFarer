
import db from '../../models/db';

const validateInputs = {

  async addBookings(req, res, next) {
    const required = ['trip_id', 'seat_number'];
    const query = {
      text: 'select * from bookings where (trip_id, seat_number) = ($1, $2)',
      values: [req.body.trip_id, req.body.seat_number],
    };
    const checkCapacity = {
      text: 'SELECT * FROM trips Inner JOIN buses ON trips.busId = buses.id WHERE trips.id = $1',
      values: [req.body.trip_id],
    };
    const result = await db.query(query);
    const booking = result.rows[0];
    const busCapacity = await db.query(checkCapacity);
    const capacity = busCapacity.rows[0];

    if (req.body.length < 1) {
      return res.status(400).json({
        status: 'error',
        error: 'The request body must not be empty',
      });
    }
    if (booking) {
      return res.status(400).json({
        status: 'error',
        error: 'This seat has already been booked',
      });
    }
    if (req.body.seat_number > capacity.capacity) {
      return res.status(400).json({
        status: 'error',
        error: `Please choose a seat number between 1 and ${capacity.capacity}`,
      });
    }

    return next();
  },

  async bookings(req, res, next) {
    const query = req.user.is_admin === true ? {
      text: 'select * from bookings where id = $1 LIMIT 1',
      values: [req.params.id],
    } : {
      text: 'select * from bookings where (user_id, id) = ($1, $2) LIMIT 1',
      values: [req.user.id, req.params.id],
    };
    const result = await db.query(query);
    const booking = result.rows[0];
    req.booking = booking;

    if (!booking && req.user.is_admin === false) {
      return res.status(404).json({
        status: 'error',
        error: 'This booking by this user does not exist',
      });
    }

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        error: 'Booking with this ID doesn\'t exist',
      });
    }

    return next();
  },
};

export default validateInputs;
