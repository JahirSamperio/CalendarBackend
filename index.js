import express from "express";
import {config} from 'dotenv';
import authRouter from './routes/auth.js'
// Ejecuta la función config() para cargar las variables de entorno desde el archivo .env
config();

//Crear servidor de express
const app = express();

// Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json());


//Rutas
app.use('/api/auth', authRouter);
//TODO: CRUD: eventos


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ', process.env.PORT)
} )