import express from "express";
import { createBusRoute, updateBusRoute, getBusRoute, deleteBusRoute } from "../controllers/busRoutesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/id_route', protectRoute,createBusRoute);
router.get('/id_route',protectRoute, getBusRoute);
router.put('/id_route', protectRoute, updateBusRoute);
router.delete('/id_route',protectRoute, deleteBusRoute);

export default router;