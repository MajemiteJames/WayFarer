import express from 'express';
import Trips from '../controllers/Trips';
import Auth from '../middleware/validators/auth';

const tripsRouter = express.Router();

tripsRouter.get('/', Auth, Trips.getTrips);
tripsRouter.post('', Auth, Trips.createTrips);
tripsRouter.patch('/:id', Auth, Trips.updateTrip);

export default tripsRouter;
