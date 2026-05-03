import express from "express";
import {signUpBusDriver, signInBusDriver, putBusDriver, deleteBusDriver, getBusDriverProfile } from '../controllers/busDriversControllers.js';
import { protectRoute } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/busdriver/signup', protectRoute,signUpBusDriver, );
router.post('/busdriver/signin', protectRoute,signInBusDriver);
//router.get('/:idBusDriver',);
router.get('/busdriver/profile', protectRoute, getBusDriverProfile);
router.delete('/:idBusDriver', deleteBusDriver);
router.put('/:idBusDriver', putBusDriver);


export default router;