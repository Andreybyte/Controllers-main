import express from 'express';
import { deleteUser, getUser, putUser, SignUpUser,SignInUser, getMyProfile } from '../controllers/usersControllers.js';
import { protectRoute } from '../middlewares/authMiddleware.js';


const router = express.Router();
/*TODAS LAS RUTAS QUE SE MUESTRAN CON LAS QUE SE TIENEN QUE USAR EN EL FRONTEND PARA HACER LA FUNCION QUE SE NECESITA, EN MODELS(FRONTEND) SE HACE EL MODELO DE DATOS Y QUE VA A LLEVAR, SE REVISA CON ANTELACION QUE EL NOMBRE DE VARIABLES SEAN IGUALES*/

router.post('/signup',SignUpUser);
router.post('/login',SignInUser);
/*El protectRoute verifica que seas parte de la base de datos pidiendote el token unico que solo pueden acceder usuarios y admins, Carpeta:(middlewares) */
 //A partir de aqui todos los datos estan protegidos

router.get('/me',protectRoute,getMyProfile);//Para ver nuestro usuario home
router.get('/:idUser',protectRoute,getUser);//PIDE ID EN PARAMS
router.put('/:idUser',protectRoute,putUser);//PIDE ID EN PARAMS
router.delete('/:idUser',protectRoute,deleteUser);//PIDE ID EN PARAMS

export default router;