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
        });

        if (authError) return res.status(400).json({ error: authError.message });
        
/*
       
        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                id: authData.user.id,
                email: authData.user.email,
                name:name_user
            }
        })
            */
        
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
        /*
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

export const SignInUser = async (req, res) => {
    console.log("Cuerpo recibido en SignIn:", req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan correo o contraseña" });
        }

        // 1. Autenticación en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return res.status(400).json({ error: authError.message });

        const userId = authData.user.id;
        const token = authData.session.access_token;

        // 2. Buscar el perfil en la tabla pública usando el ID de Auth
        const { data: profile, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id_user', userId)
            .maybeSingle(); // Evita el error PGRST116 si no encuentra coincidencia

        if (userError) {
            console.error("Error en la consulta de la base de datos:", userError.message);
            return res.status(500).json({ error: "Error interno al buscar el perfil" });
        }

        // CONTROL: Si la fila existe en la BD pero aquí llega null, algo pasa con los permisos o el ID
        if (!profile) {
            console.log(`[ALERTA] Auth correcto para ${email}, pero no hay fila en 'public.users' con id_user: ${userId}`);
            return res.status(404).json({ error: "El perfil del usuario no existe en la tabla pública" });
        }

        // 3. Si todo está bien, devolvemos el token y los datos de la fila
        return res.status(200).json({
            message: "Login exitoso",
            token: token,
            user: profile // Aquí van name_user, email_user, etc.
        });

    } catch (error) {
        console.error("Error en el servidor durante SignIn:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

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
