import express from "express";
import { createBusStopBusStop, updateBusStop,getBusStop, deleteBusStop } from "../controllers/busStopControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('./id_bus_stop', protectRoute,createBusStopBusStop ),
router.put('./id_bus_stop', protectRoute, updateBusStop);
router.get('./id_bus_stop', protectRoute, getBusStop);
router.delete('./id_bus_stop', protectRoute, deleteBusStop);

export default router;