import { Router } from 'express';
import userRouter from './user';
import tripsRouter from './trips';
import BusRouter from './bus';
import BookingRouter from './booking';

const router = Router();

router.use('/auth', userRouter);
router.use('/trips', tripsRouter);
router.use('/bus', BusRouter);
router.use('/bookings', BookingRouter);

export default router;
