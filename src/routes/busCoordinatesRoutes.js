import express from "express";
import { ctRoutePPolylines, deleteCurrentBusInRoute, getBusData, putBusData } from "../controllers/busCoordinatesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();


 // router.post('/id_route')
router.put('/:id_route', protectRoute,putBusData);
router.get('/:id_route', protectRoute, ctRoutePPolylines);
router.get('/:id_route', protectRoute, getBusData);
router.delete('/:id_route',protectRoute,deleteCurrentBusInRoute);

export default router;