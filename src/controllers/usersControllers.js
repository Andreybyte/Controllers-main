import { supabase } from '../config/supabase.js';



export const SignUpUser = async (req, res) => {
    console.log("Cuerpo recibido en SignUp:", req.body);
    try {
        const { name_user, email, password } = req.body;

        if (!email || !password || !name_user) {
            return res.status(400).json({ error: "Faltan email, contraseña o nombre de usuario" });
        }

        // 1. Hacemos el SIGNUP pasando los metadatos necesarios para los Triggers de Postgres
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name_user: name_user // Esto viaja en raw_user_meta_data
                }
            }
        });

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }

        // 2. Si tu trigger no actualiza el nombre automáticamente, lo hacemos de forma manual aquí
        
        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                id: authData.user.id,
                email: authData.user.email,
                name:name_user
            }
        })
        /*
        const { data: userData, error: updateError } = await supabase
            .from('users')
            .update({ name_user })
            .eq('id_user', authData.user.id)
            .select();

        if (updateError) {
            // Si falla el guardado en la tabla pública, borramos el usuario de Auth por consistencia
            await supabase.auth.admin.deleteUser(authData.user.id);
            return res.status(400).json({ error: updateError.message });
        }

        res.status(201).json({ 
            message: "Usuario creado con éxito", 
            user: userData ? userData[0] : authData.user 
        });
        */

    } catch (error) {
        console.error("Error en el servidor durante SignUp:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}; //CREAR USER

export const SignInUser = async (req,res)=>{
    /*Loguear al usuario con una cuenta ya creada, para hacer login y nos devuelve un token UNICO para poder acceder a otras funciones que solo usuarios o admins puedan usar. Por motivos de seguridad que ninguna otra persona pueda hacer peticiones Importante*(DESPUES DE AQUÍ SE VALIDA EL TOKEN)* */
    console.log("Cuerpo recibido en SignIn:" , req.body);
    try {
        // Corregido: Mapeamos según lo que envías desde Thunder Client (email y password)
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }

        // Intentamos el login en Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }

        // Control de seguridad: Si la cuenta requiere confirmación por email, 'session' podría ser null
        if (!authData.session) {
            return res.status(401).json({ error: "Por favor, verifica tu correo electrónico antes de ingresar." });
        }

        // Traemos los datos complementarios de la tabla pública
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id_user', 'name_user')
            .eq('id_user', authData.user.id)
            .single();

        if (userError || !userData) {
            console.error("Error al buscar perfil público:", userError);
            // No rompemos, respondemos con lo que tenemos de Auth
        }

        res.status(200).json({
            message: "Bienvenido a BusApp",
            token: authData.session.access_token,
            user: {
                id: authData.user.id,
                email: authData.user.email,
                name: userData ? userData.name_user : "Sin Nombre",
            }
        });

    } catch (error) {
        console.error("DETALLE DEL ERROR EN LOGIN:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
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
    try{
    const {idUser} = req.params
    const {data,error} = await supabase
        .from('users')
        .delete()
        .eq('id_user',idUser);
        if(error) return res.status(400).json({error: error.message})
        res.json({mensaje: `Usuario ${idUser} eliminado`});
    }catch(error){
        res.status(500).json({error: "Error del servidor"});
    }
   
    
}
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
