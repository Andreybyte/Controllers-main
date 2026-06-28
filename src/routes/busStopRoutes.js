import express from "express";
import { createBusStop, updateBusStop,getBusStop, deleteBusStop } from "../controllers/busStopControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create',protectRoute,createBusStop );
router.put('/update/:idBusStop', protectRoute, updateBusStop);
router.get('/data/:idBusStop', protectRoute, getBusStop);
router.delete('/delete/:idBusStop', protectRoute, deleteBusStop);

export default router;