import express from "express";
import { createBus, updateBus, getBus, deleteBus } from "../controllers/busesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/buses', protectRoute, createBus);
router.get('/buses',protectRoute, getBus);
router.put('/buses', protectRoutes, updateBus);
router.delete('/buses', protectRoute, deleteBus);

export default router;