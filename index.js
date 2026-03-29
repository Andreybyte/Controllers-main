
import app from './src/app.js';
//FALTA IMPORTAR EL SUPABASE IMPORTANTE!!!

/*Definimos la ruta al arrancar el servidor de node.js*/

const PORT = process.env.PORT || 3000; //USAMOS PUERTO 3000 TEMPORAL LOCALHOST

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Servidor modularizado y corriendo en http://localhost:${PORT}`);
    console.log(`   - http://localhost:${PORT}/api/users`);
    console.log(`   - http://localhost:${PORT}/api/admins`);
});
//FALTAN POR DEFIINIR RUTAS PARA TENER A MANO, REVISAR 

