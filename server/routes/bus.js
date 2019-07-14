import express from 'express';
import Bus from '../controllers/Bus';

const BusRouter = express.Router();

BusRouter.post('', Bus.createBus);
BusRouter.get('/', Bus.getBuses);
BusRouter.patch('/:id', Bus.updateBus);

export default BusRouter;
