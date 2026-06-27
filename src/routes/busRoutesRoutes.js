import express from "express";
import { createBusRoute, updateBusRoute, getBusRoute, deleteBusRoute } from "../controllers/busRoutesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', protectRoute,createBusRoute);
router.get('/data/id_route',protectRoute, getBusRoute);
router.put('/update/id_route', protectRoute, updateBusRoute);
router.delete('/delete/id_route',protectRoute, deleteBusRoute);

export default router;