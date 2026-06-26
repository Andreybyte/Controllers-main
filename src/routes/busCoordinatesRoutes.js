import express from "express";
import { ctRoutePPolylines, deleteCurrentBusInRoute, getBusData, putBusData } from "../controllers/busCoordinatesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();


 // router.post('/id_route')
router.put('/:idRoute/data', protectRoute, putBusData);
router.get('/:idRoute/polylines', protectRoute, ctRoutePPolylines);
router.get('/:idRoute', protectRoute, getBusData);
router.delete('/:idRoute',protectRoute,deleteCurrentBusInRoute);

export default router;