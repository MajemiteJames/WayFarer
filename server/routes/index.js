import { Router } from 'express';
import userRouter from './user';
import tripsRouter from './trips';
import BusRouter from './bus';

const router = Router();

router.use('/auth', userRouter);
router.use('/trips', tripsRouter);
router.use('/bus', BusRouter);

export default router;
