import express from "express";
import { createBus, updateBus, getBus, deleteBus } from "../controllers/busesControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', protectRoute, createBus);
router.get('/data/:id_bus',protectRoute, getBus);
router.put('/update/:id_bus', protectRoute, updateBus);
router.delete('/delete/:id_bus', protectRoute, deleteBus);

export default router;