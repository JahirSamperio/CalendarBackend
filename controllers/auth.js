import { validationResult } from "express-validator";

export const crearUsuario =  (req, res) => {

    const {name, email, password} = req.body;

    //Manejo de errrores
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'Registro',
        name, 
        email, 
        password
    });
}

export const loginUsuario = (req, res) => {
    const {email, password} = req.body

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

export const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}