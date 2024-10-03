import express from "express";
import {config} from 'dotenv';
import cors from 'cors'
import authRouter from './routes/auth.js'
import eventsRouter from './routes/events.js'
import { dbConnection } from "./database/config.js";
// Ejecuta la función config() para cargar las variables de entorno desde el archivo .env
config();

//Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())

// Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json());


//Rutas
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ', process.env.PORT)
} )