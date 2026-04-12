import { supabase } from "../config/supabase.js";

export const SignUpBusDriver = async (req, res )=> {
    

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
            email_busdriver: email
            }])
        .select();
    if (error) return res.status(400).json({authErrorerror:error.message})
        console.log('DATOS DE BUSDRIVER DESDE DB', data);
        res.status(201).json({message: 'Conductor creado y autenticado con exito', user: data[0]}); 

    
    }catch(error){
    res.status(500).json({authError: 'Error del servidor'});
    }

}