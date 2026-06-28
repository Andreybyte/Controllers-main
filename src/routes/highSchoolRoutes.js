
import express from "express";
import { deleteHighSchoolProfile, getHighSchoolProfile, createHighSchoolData, updateHighSchoolProfile } from "../controllers/highSchoolControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create',protectRoute,createHighSchoolData);
router.get('/data/:idHighSchool', protectRoute,getHighSchoolProfile);
router.put('/update/:idHighSchool', protectRoute, updateHighSchoolProfile);
router.delete('/delete/:idHighSchool', protectRoute, deleteHighSchoolProfile);

export default router;