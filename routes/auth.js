import { Router } from 'express';
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.js';
import { loginValidators, newUserValidators } from '../middlewares/validators/auth.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/new', 
    newUserValidators, //Validators 
    crearUsuario
)

router.post(
    '/', 
    loginValidators, 
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

export default router