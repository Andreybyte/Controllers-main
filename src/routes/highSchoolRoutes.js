import express from "express";
import { putHighSchoolData } from "../controllers/highSchoolControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put('/:id_highschool', protectRoute,putHighSchoolData);

export default router;