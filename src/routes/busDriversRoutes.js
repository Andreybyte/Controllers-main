import express from "express";
import {signUpBusDriver, signInBusDriver, putBusDriver, deleteBusDriver, getBusDriverProfile } from '../controllers/busDriversControllers.js';
import { protectRoute } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/signup', signUpBusDriver );
router.post('/signin', signInBusDriver);
//router.get('/:idBusDriver',);
router.get('/profile', protectRoute, getBusDriverProfile);
router.delete('/:idBusDriver', deleteBusDriver);
router.put('/:idBusDriver', putBusDriver);


export default router;