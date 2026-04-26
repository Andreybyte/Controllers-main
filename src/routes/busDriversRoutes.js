import express from "express";
import {signUpBusDriver, signInBusDriver, putBusDriver, deleteBusDriver, getBusDriverProfile } from '../controllers/busDriversCotrollers';
import { protectRoute } from "../middlewares/authMiddleware";


const router = express.Router();

router.post('/signup', signUpBusDriver, );
router.post('/login', signInBusDriver);
//router.get('/:idBusDriver',);
router.get('/:idBusDriver', protectRoute, getBusDriverProfile);
router.delete('/:idBusDriver', deleteBusDriver);
router.put('/:idBusDriver', putBusDriver);


export default router;