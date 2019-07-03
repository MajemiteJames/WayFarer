import express from "express";
import user from "../DummyController/User";
import validator from "../middleware/validator";
import signInValidator from "../middleware/signInValidator";

const router = express.Router();

router.get("/users", user.getUsers);
router.post("/auth/signup", validator, user.createUser);
router.post("/auth/signin", signInValidator, user.signIn);

export default router;
