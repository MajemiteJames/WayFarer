import express from 'express';
import User from '../controllers/User';
import signUpValidator from '../middleware/validators/signUpValidator';
import signInValidator from '../middleware/validators/signInValidator';
import Bus from '../controllers/bus';

const router = express.Router();


router.post('/signup', signUpValidator, User.create);
router.post('/signin', signInValidator, User.login);
router.post('/bus', Bus.create);

export default router;
