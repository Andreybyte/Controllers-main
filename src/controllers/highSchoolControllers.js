import { supabase } from "../config/supabase.js";

export const createHighSchoolData = async(req, res) => {

    try{
        const{name_highschool,location_latitud,location_longitud} = req.body;
        const {data, error} = await supabase 
            .from('highschool')
            .insert([{name_highschool,
                location_latitud,
                location_longitud}])
            .select();
        if (error) return res.status(400).json({error:error.message})
        if (data.length == 0){
            return res.status(400).json({error:'No se actualizaron los datos del colegio correctamente.'})
        }
        res.status(200).json({message:"Colegio añadido con exito"})

    }catch(error){
        res.status(500).json({error: 'Error del servidor'});
    }

}

export const updateHighSchoolProfile = async (req, res) => {

    try{
        const{idHighSchool} = req.params;
        const{data, error} = await supabase
            .from('highschool')
            .select(`
                name_highschool,
                location_latitud,
                location_longitud`)
            .eq('id_highschool', idHighSchool)
            .select();
            if(error) return res.status(400).json({error: error.message});
            if(data.length == 0){
                res.status(400).json({error: "Error al actualizar el perfil del colegio."});
                console.error('Error con:', error);
            }
            res.status(200).json({message:'Colegio actualizado correctamente.'})
        }catch(error){
            res.status(500).json({error: 'Error del servidor'});
        }
    }
    


export const getHighSchoolProfile = async(req,res) => {
    try{
        const {idhighschool} = req.params;
        const {data, error} = await supabase
            .from('highschool')
            .select(`
                name_highschool,
                location_latitud,
                location_longitud
                `)
            .eq('id_highschool',idhighschool)
            .single();    
        if (error) return res.status(400).json({error:error.message});
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Error al obtener el perfil completo'});

    }
    

}

export const deleteHighSchoolProfile = async(req,res) => {

    try{
        const{idHighSchool} = req.params;
        const {error} = await supabase
            .from('highschool')
            .eq('id_highschool', idHighSchool)
            .delete();

        if (error) return res.status(400).json({error: error.message})
            res.json({message:`Colegio ${idHighSchool} eliminado`});
            console.log(`Colegio ${idHighSchool} eliminado`);
    }catch(error){
        res.status(500).json({error:'Error del servidor'});
    }
}

