import { supabase } from "../config/supabase.js";

export const putBusStop = async (req, res) => {

    try{
        const {idBusStop} = req.params;
        const{} = req.body;
        const{data, error} = await supabase
            .from('')
            .update({})
            .eq('', idBusStop)
            .select();
        if (error) return res.status(400).json({error:error.message});
        if (data.length == 0){
            return res.status(400).json({error:'Error al actualizar la parada de bus.'})
        }
        res.status(200).json({message:'Parada de bus añadida con exito.'})

    }catch(error){
        res.status(500).json({error: 'Error del servidor.'})
    }
}

export const getBusStop = async (req,res) => {
    try{
        const {idBusStop} = req.params;
        const {data, error} = await supabase
            .from('bus_stop')
            .select(`
                name_busstop,
                location_busstop_lat,
                location_busstop_long,
                imagen_busstop        
                `)
            .eq('id_busstop', idBusStop)
            .single();
        if(error) return res.status(400).json({error:error.message});
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Error al obtener los datos completos de la parada de bus. '})
    }

}

export const deleteBusStop = async (req, res) => {
    try{
        const{idBusStop} = req.params;
        const {error} = await supabase
            .from('bus_stop')
            .delete()
            .eq('id_busstop', idBusStop);
        if (error) return res.status(400).json({error:error.message});
        res.json({message:`Parada de bus ${idBusStop} eliminado.`});
        console.log(`Parada de bus ${idBusStop} eliminado.`);
    }catch(error){
        res.status(500).json({error:'Error del servidor'})
    }
}