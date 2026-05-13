import { supabase } from "../config/supabase.js";

export const createBusStop = async (req, res) => {

    try{
        const {idBusStop} = req.params;
        const{} = req.body;
        const{data, error} = await supabase
            .from('bus_stop')
            .insert([{name_bus_stop,
                location_bus_stop_lat,
                location_bus_stop_long,
            }])
            .select();
        if (error) return res.status(400).json({error:error.message});
        if (data.length == 0){
            return res.status(400).json({error:'Error al actualizar la parada de bus.'})
        }
        res.status(200).json({message:'Parada de bus añadida con exito.'})

    }catch(error){
        res.status(500).json({error: 'Error del servidor.'});
    }
}

export const updateBusStop = async (req, res) => {
    try{
        const {idBusStop} = req.params;
        const {name_bus_stop, location_bus_stop_lat, location_bus_stop_long} = req.body;
        const {data, error} = await supabase
            .from('bus_stop')
            .select(`
                name_bus_stop,
                location_bus_stop_lat, 
                location_bus_stop_long
                `)
            .eq('id_bus_stop', idBusStop)
            .single();
        if (error) return res.status(400).json({error:error.message});
        if(data.length == 0){
            return res.status(400).json({error:'Error al actualizar la parada de bus'});
        }
        res.json(data);
    }catch(error){
        res.status(500).json({error: 'Error del servidor'});
    }
}

export const getBusStop = async (req,res) => {
    try{
        const {idBusStop} = req.params;
        const {data, error} = await supabase
            .from('bus_stop')
            .select(`
                name_busstop,
                location_bus_stop_lat,
                location_bus_stop_long      
                `)
            .eq('id_busstop', idBusStop)
            .single();
        if(error) return res.status(400).json({error:error.message});
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Error al obtener los datos completos de la parada de bus. '});
    }

}

export const deleteBusStop = async (req, res) => {
    try{
        const{idBusStop} = req.params;
        const {error} = await supabase
            .from('bus_stop')
            .delete()
            .eq('id_bus_stop', idBusStop);
        if (error) return res.status(400).json({error:error.message});
        res.json({message:`Parada de bus ${idBusStop} eliminado.`});
        console.log(`Parada de bus ${idBusStop} eliminado.`);
    }catch(error){
        res.status(500).json({error:'Error del servidor'});
    }
}