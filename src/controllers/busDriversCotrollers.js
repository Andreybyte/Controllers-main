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

export const signInUser = async (req, res) => {

    try{
    const { email_busdriver: email, password_busdriver} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (authError) return res.status(400).json({authError: ' Credenciales Incorrectas'});

    const {data: userData, error: userError}= await supabase

       .from('busdrivers')
       .select(`
           id_busdriver,
           name_busdriver

            `)
       .eq('id_busdriver', authData.busdriver.id)
       .single()
        ;
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

            }


        });




        
        
        

    }

}