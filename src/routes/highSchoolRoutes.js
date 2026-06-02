
import express from "express";
import { deleteHighSchoolProfile, getHighSchoolProfile, putHighSchoolData, updateHighSchoolProfile } from "../controllers/highSchoolControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/:id_highschool', protectRoute,putHighSchoolData);
router.get('/:id_highschool', protectRoute,getHighSchoolProfile);
router.put('/id_highschool', protectRoute, updateHighSchoolProfile);
router.delete('/:id_highschool', protectRoute, deleteHighSchoolProfile);

export default router;