import { supabase } from '../config/supabase.js';

//Funcion para enviar nuevas coordenadas a la base de datos o actualizarlas
export const putBusData = async(req,res) => {
    try{
        const{idRoute} = req.params;
        const{current_lat,current_long,velocity} = req.body;
        const {data,error} = await supabase
            .from('current_bus_in_route')
            .update({current_lat,current_long,velocity})
            .eq('id_route',idRoute)
            .select();

        if (error)return res.status(400).json({error:error.message})
        if (data.length==0){
            return res.status(400).json({error: "No se actualizo la coordenada correctamente"})
        }
        res.json({message: "Actualizado correctamente", data})

    }catch(error){
        res.status(500).json({message:"Error del servidor"})
    }

}
// Funcion para obtener el json almacenado de los polylines de la ruta seleccionada
export const getRoutePPolylines = async(req,res) => {
    try{
        const{idRoute} = req.params;
        const{data,error} = await supabase
            .from('current_bus_in_route')
            .select(`
                polyline_json
                `)
            .eq('id_route', idRoute)
            .single();
        if(error) return res.status(404).json({error: error.message});
                res.json(data);
    }catch(error){
        res.status(500).json({error: 'Error al obtener las coordenadas'})
    }
}

//Obtener las coordenadas y velocidad del bus  
export const getBusData = async(req,res) => {
    try{
        const{idRoute} = req.params;
        const{data,error} = await supabase
            .from('current_bus_in_route')
            .select(`
                current_long,
                current_lat,
                velocity
                `)
            .eq('id_route', idRoute)
            .single();
        if(error) return res.status(404).json({error: error.message});
                res.json(data);
    }catch(error){
        res.status(500).json({error: 'Error al obtener las coordenadas'})
    }
}

