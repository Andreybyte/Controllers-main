import { supabase } from "../config/supabase.js";

export const createBus = (req, res) => {
    try{
        const {id_bus} = req.params;
        const{bus_number, is_available} = req.body;
        const {data, error} = await supabase
        .from('buses')
        .insert([{bus_number}])
        .select();
        if(error) return res.status(400).json({error:error.message});
        if (data.length == 0){
            return res.status(400).json({error:'Error al crear el registro del bus.'})
        }
        res.status(200).json({message:'Bus resgistrado con exito'})
    }catch(error){
        res.status(500).json({error: 'Error del servidor.'});
    }
}
export const updateBus = (req, res) => {
    try{
        const {id_bus} = req.params;
        const{bus_number, is_available} = req.body;
        const {data, error} = await supabase
        .from('buses')
        .update({
            bus_number,
            is_available
        });
        if(error) return res.status(400).json({error:error.message});
        if(data.length == 0){
            return res.status(400).json({error: 'Error al actualizar el bus.'})
        }
        res.status(200).json({message:'El bus se actualizo correctamente'});

    }catch(error){
        res.status(500).json({error:'Error en el servidor.'})
    }
}
export const getBus = (req, res) => {
    try{
        const {id_bus} = req.params;
        const {data, error} = await supabase
            .from('buses')
            .select(`
                bus_number,
                is_available
                `)
            .eq('id_bus',id_bus)
            .single();
        if(error) return res.status(400).json({error:error.message});
        if(data.length == 0){
            res.status(400).json({error:'Error al obtener los datos del bus.'})
        }
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Error del servidor'});
    }
}
export const deleteBus = (req, res) => {
    try{
        const {id_bus} = req.params;
        const {error} = await supabase
            .from('buses')
            .eq('id_bus', id_bus)
            .delete();
        if (error) return res.status(400).json({error: error.message});
        res.status(200).json({message:'El bus se elimino con exito.'})
    }catch(error){
        res.status(500).json({error:'Error del servidor.'})
    }
}
