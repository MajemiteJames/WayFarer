import { Router } from 'express';
import userRouter from './user';
import tripsRouter from './trips';

const router = Router();

router.use('/auth', userRouter);
router.use('/trips', tripsRouter);

export default router;
