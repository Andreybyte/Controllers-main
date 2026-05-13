import express from "express";
import { putBusData } from "../controllers/busCoordinatesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put('/:id_route', protectRoute,putBusData);

export default router;