import express from "express";
import {SignUpBusDriver} from '../controllers/busDriversCotrollers';
import router from "./usersRoutes";
import { protectRoute } from "../middlewares/authMiddleware";


const router = express.Router();

router.post('/signup', SignUpBusDriver);

router.get('/:id_busdriver', protectRoute, getUser);

export default router;