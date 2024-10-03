import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from "../controllers/events.js";
import { newEventValidators } from "../middlewares/validators/events.js";

const router = Router();

//En caso de que todas las rutas ocupen el mismo middleware
router.use( validarJWT );

//Todos tiene que pasar por la validacion del JWT
//Obtener eventos
router.get('/', getEventos);

//Crear nuevo evento
router.post(
    '/', 
    newEventValidators,
    crearEvento
);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Eliminar evento
router.delete('/:id', eliminarEvento);

export default router;


