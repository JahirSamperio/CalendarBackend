import { Router } from 'express';
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.js';
import { loginValidators, newUserValidators } from '../middlewares/validators/auth.js';

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

router.get('/renew', revalidarToken)

export default router