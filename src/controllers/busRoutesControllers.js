import { supabase } from "../config/supabase.js";

export const createBusRoute = async (req, res) => {

    try{
        const {name_route, details_route,start_route_lat, start_route_long} = req.body;
        const {data, error} = await supabase
            .from('routes')
            .insert([{name_route, 
                details_route, 
                start_route_lat, 
                start_route_long}]);
        if(error) return res.status(400).json({error:error.message});
        if (data.length == 0){
            return res.status(400).json({error: 'Error al añadir la ruta.'})
        }
        res.status(200).json({message:'¡¡Ruta añadida con exito!!'});
    }catch(error){
        res.status(500).json({error: 'Error del servidor'})
    }
}
export const getBusRoute = (req, res) => {
    try{
        const {id_Route} = req.params;
        const {data, error} = await supabase
        .from('routes')
        .select(`
            name_route,
            details_route,
            start_route_lat,
            start_route_long
            `)
        .eq('id_route', id_Route)
        .single();
        if (error) return res.status(400).json({error:error.message});
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Error del servidor.'});
    }
}



export const updateBusRoute =(req, res) => {
   try{
    const {name_route, details_Route,start_route_lat, start_route_long } = req.body;
    const {data, error} = await supabase
        .from('routes')
        .update({
            name_route, 
            details_route,
            start_route_lat, 
            start_route_long});
    if(error) return res.status(400).json({error:error.message});
    if(data.length == 0){
        return res.status(400).json({error:'Error al actualizar ruta'})
    }
    res.status(200).json({message:'La ruta se actualizo correctamente'});
}catch(error){
    res.status(500).json({error:'Error del servidor'})
}
}

export const deleteBusRoute = (req, res) => {
    try{
        const {id_Route} = req.params;
        const {error} = await supabase
            .from('Routes')
            .eq('id_route', id_Route)
            .delete();
        if(error) return res.status(400).json({error:error.message})
        res.status(200).json({message:'La ruta se elimino correctamente.'});
    }catch(error){
        res.status(500).json({error:'Error del servidor'});
    }
}