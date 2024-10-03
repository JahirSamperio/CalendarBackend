import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';
import { isDate } from './isDate.js';

export const newEventValidators =  [  //Middlewares
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
    //Envia los errores
    validarCampos
];
