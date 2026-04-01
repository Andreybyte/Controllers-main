import { supabase } from "../config/supabase.js";

export const putHighSchoolData = async(req, res) => {

    try{
        const {idHighSchool} = req.params;
        const{name_highschool,location_latitud,location_longitud} = req.body;
        const {data, error} = await supabase 
            .from('highschool')
            .update({name_highschool,location_latitud,location_longitud})
            .eq('id_highschool', idHighSchool)
            .select();

        if (error) return res.status(400).json({error:error.message})
        if (data.length == 0){
            return res.status(400).json({error:'No se actualizaron los datos del colegio correctamente.'})
        }

    }catch(error){
        res.status(500).json({error: 'Error del servidor'})
    }

}

export const getHighSchoolProfile = async(req,res) => {
    try{
        const {idhighschool} = req.params;
        const {data, error} = await supabase
            .from('highschool')
            .select(
                'name_highschool',
                'location_latitud',
                'location_longitud'
            )
            .eq('id_highschool',idhighschool)
            .single();
        res.json(data);    
        if (error) return res.status(400).json({error:error.message})
    }catch(error){
        res.status(500).json({error:'Error al obtener el perfil completo'})

    }
    

}
