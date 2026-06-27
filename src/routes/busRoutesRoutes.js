import express from "express";
import { createBusRoute, updateBusRoute, getBusRoute, deleteBusRoute } from "../controllers/busRoutesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', protectRoute,createBusRoute);
router.get('/data/:idRoute',protectRoute, getBusRoute);
router.put('/update/:idRoute', protectRoute, updateBusRoute);
router.delete('/delete/:idRoute',protectRoute, deleteBusRoute);

export default router;