import express from 'express';
import Bus from '../controllers/Bus';
import Auth from '../middleware/validators/auth';

const BusRouter = express.Router();

BusRouter.post('', Auth, Bus.createBus);
BusRouter.get('/', Auth, Bus.getBuses);
BusRouter.patch('/:id', Auth, Bus.updateBus);

export default BusRouter;
