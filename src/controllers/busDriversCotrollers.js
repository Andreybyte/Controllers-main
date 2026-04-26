import { supabase } from "../config/supabase.js";

export const SignUpBusDriver = async (req, res )=> {
    //Esta funcion realiza el post del conductor, pedimos todos los datos necesarios

    console,log,("Cuerpo recibido:", req.body) ;

    try{
    const {nameBusDriver, phoneNumberBuDriver, profileImageBusDriver,emailBusDriver, passwordBusDriver}=req.body;
    
    if(emailBusDriver|| !passwordBusDriver){
        console.log("¡Faltan datos! Email:", email, "Pass:", password);
        return res.status(400).json({error:'Faltan email o contraseña'});
    }
    //Se hace el SIGNUP con el Auth de SUPABASE
    const {data:authData,error:authError} = await supabase.auth.signUp({
        
        email,
        password
    });
    if (authError) return res.status(400).json({error: authError.message});
    //Pedimos los datos desd el auth de SUPABASE que guardamos y extras
    const {data,error} = await supabase
        .from('busdrivers')
        .insert([{
            id_busdriver:authData.user.id, //El UUID de Auth
            name_BusDriver,
            email_busdriver: email //El  email del Auth
            }])
        .select();
    if (error) return res.status(400).json({authErrorerror:error.message})
        console.log('DATOS DE BUSDRIVER DESDE DB', data);
        res.status(201).json({message: 'Conductor creado y autenticado con exito', user: data[0]}); 

    
    }catch(error){
    res.status(500).json({authError: 'Error del servidor'});
    }

};//CREAR CONDUCTOR

export const signInUser = async (req, res) => {
    //SE LOGUEA AL USUARIO CON UNA CUENTA ANTERIORMENTE CREA, NOS DEVOLVERA UN TOKEN UNICO CON EL QUE PODRA ACCEDER A FUNCIONES UNICAS PARA EL, 

    try{
    const { email_busdriver: email, password_busdriver: password} = req.body;
    
    const {data: authData, error: authError}  =await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (authError) return res.status(400).json({authError: ' Credenciales Incorrectas'});
    //SE USA EL LOGIN DE SUPABASE PARA ACCCEDER A EMAIL Y PASSWORD
    const {data: userData, error: userError}= await supabase

       .from('busdrivers')
       .select(`
           id_busdriver,
           name_busdriver

            `)
       .eq('id_busdriver', authData.busdriver.id)
       .single();
            if (userError || !userData){
            console.error('Error de SUPABASE:', userError);
            res.status(404).json({error: "ERROR"});
            return
            }

        console.log('DATOS DE BUSDRIVER DESDE DB:', userData);

        res.status(200).json({

            message: ' Bienvenido a BusApp',
            token: authData.session.access_token,
            user: {
                id: authData.busdriver.id,
                email: authData.busdriver.email,
                name: userData.busdriver.name || 'Sin nombre',

            }
        });


    }
    catch(error){
        console.error('DETALLE DEL ERROR:', error.message);
        res.status(500).json({error: error.message});

    }

};//LOGUEAR CONDUCTOR

export const putBusDriver = async(req,res) => {
    //EDITAR EMAIL O NOMBRE
    try{
    const {idBusDriver} = req.params;
    const{name_BusDriver, email_busdriver} = req.body;
    const{data, error} = await supabase
        .from('bus_drivers')
        .update({name_BusDriver, email_busdriver})
        .eq('id_busdriver', idBusDriver)
        .select();
    
    if (error) return res.status(400).json({error: error.message});
    if (data.length === 0){
        return req.status(404).json({error: 'No se encontro el conductor para actualizar'});
    }
        res.json({message: 'Actualizado correctamente'});
    }
    catch(error){
        res.status(500).json({error:'Error del servidor'});
    }

}//EDITAR LA INFORMACION DEL CONDUCTOR

export const deleteBusDriver = async (req, res) => {

    const {idBusDriver} = req.params;
    const {data, error} = await supabase
        .from('bus_drivers')
        .delete()
        .eq('id_busdriver', idBusDriver);
    if(error) return res(400).json({error: error.message});
    res.json({message: `Conductor ${idBusDriver} eliminado.`})
        
}//BORRAR USUARIOS(SOLO PARA ADMINS)


export const getMYBusDriverProfile = async (req, res) => {
    try{
        const idBusDriver = req.busdriver.id;

        const {data:profile, error:userError} = await supabase
            .from('busdrivers')
            .select('*')
            .eq('id_busdriver', idBusDriver);
        if(profile){
            return res.status(200).json({
                ...profile,
                userType: 'driver' //PARA EL FRONTEND
            });
        }
        return res.status(404).json({error:'Perfil no encontrado'})

    }
    catch(error){
        res.status(500).json({error:'Error al obtener el perfil'});
    }


}//OBTENER EL PERFIL DEL BUS DRIVER ✪ ω ✪

/*
export const getBusDriver = async (req, res) => {
    //EN ESTA FUNCION VAMOS A OBTENER UN PERFIL EN ESPECIFICO DE UN CONDUCTOR, CON TODOS LOS DETALLES EXTRA



}*/