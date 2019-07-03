import express from "express";
import trip from "../DummyController/Trip";

const router = express.Router();

router.get("/trips", trip.getTrips);

export default router;
