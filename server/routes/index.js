import express from 'express';
import User from '../controllers/User';
import signUpValidator from '../middleware/validators/signUpValidator';
import signInValidator from '../middleware/validators/signInValidator';

const router = express.Router();


router.post('/signup', signUpValidator, User.create);
router.post('/signin', signInValidator, User.login);

export default router;
