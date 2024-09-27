import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const newUserValidators =  [  //Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
];

export const loginValidators =  [  //Middlewares
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
];

