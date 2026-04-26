import { supabase } from '../config/supabase.js';



export const SignUpUser = async (req,res) => {
    /*Funcion para hacer el post del usuario, pedimos todos los datos necesarios para poder crear al usuario, después usamos SignIn(Login) para ingresar con el user */
    console.log("Cuerpo recibido:", req.body);
    try {
    const {name_user, email, password} = req.body;

    if (!email || !password) {
            console.log("¡Faltan datos! Email:", email, "Pass:", password);
            return res.status(400).json({ error: "Faltan email o contraseña" });
        }
    //***Hacemos el SIGNUP con el Auth de SUPABASE***
    const {data: authData,error: authError} = await supabase.auth.signUp({
        email,
        password,
    });
    if (authError) return res.status(400).json({error: authError.message});
    //Pedimos los datos desde el auth de SUPABASE que guardamos y extras
    const {data,error} = await supabase
        .from('users')
        .insert([{
            id_user: authData.user.id,// El UUID de Auth
            name_user,
            email_user: email //EL EMAIL DE Auth
            }])
        .select();
    if (error) return res.status(400).json({authError: error.message})
        console.log("DATOS DE USER DESDE DB:", data);
        res.status(201).json({ message: "Usuario creado y autenticado", user: data[0] });
}catch(error){
    res.status(500).json({ authError: "Error en el servidor" });
}
};//CREAR USER

export const SignInUser = async (req,res)=>{
    /*Loguear al usuario con una cuenta ya creada, para hacer login y nos devuelve un token UNICO para poder acceder a otras funciones que solo usuarios o admins puedan usar. Por motivos de seguridad que ninguna otra persona pueda hacer peticiones Importante*(DESPUES DE AQUÍ SE VALIDA EL TOKEN)* */
    try{
    const {email_user: email,password_user: password} = req.body;
    //USAMOS EL LOGIN DE SUPABASE PARA ACCEDER A PASSWORD Y EMAIL
    const {data: authData,error: authError} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (authError) return res.status(400).json({authError: "Credenciales Incorrectas"});

    const {data: userData,error: userError} = await supabase
        .from('users')
        .select(`
            id_user,
            name_user
        `)
        .eq('id_user',authData.user.id)//USAMOS EL UUID DE REFERENCIA
        .single();

        if (userError || !userData){
            /*SI NO LLEGARON LOS DATOS O SUCEDIÓ ERROR*/
            console.error("ERROR DE SUPABASE:", userError);
            res.status(404).json({error: "ERROR"});
            return
        }

        console.log("DATOS DE USER DESDE DB:", userData);    
    res.status(200).json({
        /*SE VERIFICA AL USUARIO Y SE LE TA UN TOKEN UNICO, ACCEDEMOS AL AUTH SUPABASE */
        message: "Bienvenido a BusApp",
        token: authData.session.access_token,
        user: {
            id: authData.user.id,
            email: authData.user.email,
            name: userData.name_user || "Sin Nombre",
        }
    });
}catch(error){
    console.error("DETALLE DEL ERROR:", error.message); //SI LA PETICION DA ERROR REVISAR CONSOLA
    res.status(500).json({ error: error.message });
}
};//LOGIN USER

export const putUser = async (req,res) => {
    /*EDITAR EMAIL O NOMBRE */
    try {
    const {idUser} = req.params;
    const {name_user,email_user} = req.body;

    const {data,error} = await supabase
        .from('users')
        .update({name_user,email_user})
        .eq('id_user',idUser)
        .select();
    if (error) return res.status(400).json({error: error.message})
    if (data.length === 0){
        return res.status(404).json({ error: "No se encontró el usuario para actualizar" });
    }
        res.json({message: "Actualizado Correctamente", data});
}catch(error){
    res.status(500).json({error: "Error en el servidor"});
    }
};//EDITAR INFORMATION USER

export const deleteUser = async (req,res) => { 
    //FUNCION UNICA Y ESPECIFICAMENTE PARA ADMINS Y USER PROPIO (CAMBIAR A FUTURO SOLO ADMINS)
    const {idUser} = req.params
    const {data,error} = await supabase
        .from('users')
        .delete()
        .eq('id_user',idUser);
    if(error) return res.status(400).json({error: error.message})
        res.json({mensaje: `Usuario ${idUser} eliminado`});
};//BORRAR USUARIO(ADMINS)

export const getMyProfile = async (req,res) =>{
    try{
    const userId = req.user.id;

    const {data:profile,error: userError} = await supabase
        .from('users')
        .select('*')
        .eq('id_user',userId)
        .single();
    
    if (profile){
        return res.status(200).json({
            ...profile,
            userType: 'client'
        });
    }
    const {data: admin,error: adminError} = await supabase
        .from('admins')
        .select('id_admin')
        .eq('id_admin',userId)
        .single();

    if(admin){
        return res.status(200).json({
            ...admin,
            userType: 'admin' //para el frontend
        });
    }
    return res.status(404).json({error: "Perfil no encontrado"})
    }catch(error){
        res.status(500).json({ error: "Error al obtener el perfil" });
    }
    
};//OBTENER PERFIL PROPIO(USER)

export const getUser = async (req,res) => {
    /*En esta funcion vamos a obtener un Usuario en específico con
    Todos los detalles extras.
    */
    try {
    const {idUser} = req.params; 
    const {data,error} = await supabase
        .from('users')
        .select(`
            id_user,
            name_user,
            email_user
            `)
        .eq('id_user' ,idUser)
        .single();
    if (error) return res.status(404).json({error: error.message})
        res.json(data);
    }catch(error){
        res.status(500).json({ error: "Error al obtener el perfil completo" });
    }
};//OBTENER USER(ADMIN)
