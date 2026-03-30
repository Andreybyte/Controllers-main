import { supabase } from '../config/supabase.js';

export const putBusData = async(req,res) => {
    try{
        const{id_route} = req.params
        const{current_lat,current_long,velocity} = req.body;
        const {data,error} = await supabase
            .from('currentbusinroute')
            .update({current_lat,current_long,velocity})
            .eq('id_route',id_route)
            .select();

        if (error)return res.status(400).json({error:error.message})
        if (data.length==0){
            return res.status(400).json({error: "No se encontro la coordenada a actualizar"})
        }
        res.json({message: "Actualizado correctamente", data})

    }catch(error){
        res.status(500).json({message:"Error del servidor"})
    }

}