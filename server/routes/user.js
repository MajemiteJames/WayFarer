
import express from 'express';
import user from '../controllers/User';
import signUpValidator from '../middleware/validators/signUpValidator';
import signInValidator from '../middleware/validators/signInValidator';

const userRouter = express.Router();

userRouter.post('/signup', signUpValidator, user.signUp);
userRouter.post('/signin', signInValidator, user.signIn);

export default userRouter;
