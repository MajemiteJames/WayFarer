import express from 'express';
import BookingsController from '../controllers/Booking';
import validateInputs from '../middleware/validators/validateBooking';
import Auth from '../middleware/validators/auth';

const BookingRouter = express.Router();

/* Bookings Routes Here */
BookingRouter.post('/', Auth, validateInputs.addBookings, BookingsController.bookTrip);
BookingRouter.get('/', Auth, BookingsController.getAllBookings);
BookingRouter.get('/:id', Auth, BookingsController.getABooking);
BookingRouter.delete('/:id', Auth, BookingsController.deleteABooking);
// BookingRouter.put('/:id', validateInputs.bookings, BookingsController.updateABooking);


export default BookingRouter;
