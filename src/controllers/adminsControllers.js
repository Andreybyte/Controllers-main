import {supabase} from "../config/supabase.js";

export const signUpAdmins = async (req, res) => {
    console.log("Cuerpo resibido: ", req.body) ;

    try{
        const {nameAdmin, emailAdmin, passwordAdmin, profileImageAdmin} = req.body; 

        if(!nameAdmin ||  !emailAdmin || !passwordAdmin){
            console.log("Faltan datos!!: email, contraseña o nombre");
            return res.status(400).json({error: 'Faltan email o contraseña o nombre'});
        }

        const {data: authData, error: authError} = await supabase.auth.signUp({
            email: emailAdmin,
            password: passwordAdmin
        });
        if(authError) return res.status(400).json({error: authError.message});

        //Se piden los datos desde el auth de SUPABASE y los guardamos

        const {data, error} = await supabase
            .from('admins')
            .insert([{
                id_admin: authData.user.id,
                name_admin: nameAdmin,
                admin_email: emailAdmin,
                profile_image_admin: profileImageAdmin || null
            }])
            .select();
        if(error) {
            console.error("Error con: ", error)
            await supabase.auth.admin.deleteUser(authData.user.id);
            return res.status(400).json({error: "Error al crear el perfil del admin, intente nuevamente."});
        }
        console.log('DATOS DE ADMIN DESDE DB: ', data);
        res.status(201).json({message: "Admin creado correctamente y autenticado con exito", user: data[0]});


    }catch(error){
        res.status(500).json({authError: 'Error del servidor', details: error.message});
    }
}//CREAR ADMINS

export const signinAdmins = async (req, res) => {
    try{
        const {emailAdmin: email, passwordAdmin: password} = req.body;
        const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
            email: emailAdmin,
            password: passwordAdmin
        });
        const {data: adminData, error: adminError} = await supabase
            .from('admins')
            .select(`
                id_admin,
                name_admin
                `)
            .eq('id_admin', authData.user.id)
            .single()
        if (adminError || !adminData){
            console.error('Error de SUPABASE: ', adminError);
            res.status(404).json({error: 'Error'});
            return
        }

        console.log('DATOS DE ADMIN DESDE DB: ', adminData)

        res.status(200).json({
            message: 'Bienvenido a BusNex',
            token: authData.session.access_token,
            admin: {
                id: authData.user.id,
                email: authData.user.email,
                name: adminData.name_admin || 'Sin nombre'
            }
        });


    }catch(error){
        console.error('DETALLE DEL ERROR: ', error.message);
        res.status(500).json({error: error.message});
    }
}

export const updateAdminData = async (req, res) => {
    try{
        const {idAdmin} = req.params;
        const {nameAdmin, emailAdmin} = req.body;
        const {data, error} = await supabase
            .from('admins')
            .update({
               name_admin: nameAdmin,
                admin_email: emailAdmin
            })
            .eq('id_admin', idAdmin)
            .select();
        if(error) return res.status(400).json({error: error.message});
        if (data.length === 0){
            return res.status(404).json({error: 'No se encontro admin para actualizar'});
        }
        res.json({message: 'Admin actualizado correctamente'});
    }catch(error) {
        res.status(500).json({error: 'Error del servidor'})
    }
}
 
