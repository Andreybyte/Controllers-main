import {supabase} from '../config/supabase.js';
//Falta importar la configuracion de SUPABASE!!!!

export const protectRoute = async (req,res,next) => {
    console.log("Verificando ruta:", req.path);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(401).json({error: "No tienes permiso(falta el token)"})
    }
    const {data: {user}, error} = await supabase.auth.getUser(token);

    if (error  || !user){
        return res.status(401).json({error: "Token invalido o expirado"});
    }
    req.user = user;
    next();
}