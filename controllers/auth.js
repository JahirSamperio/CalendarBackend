import { validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { validarCampos } from "../middlewares/validators/validarCampos.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { generarJWT } from "../helpers/jwt.js";


export const crearUsuario =  async(req, res) => {
    
    const {name, email, password} = req.body;
   
    try {

        let usuario = await Usuario.findOne({ email: email})

        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);
        
        await usuario.save();
        
        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

                
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

export const loginUsuario = async(req, res) => {

    const { email, password } = req.body

    try {

        const usuario = await Usuario.findOne({ email: email})

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Confirmar passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        })
    }

}

export const revalidarToken = async(req, res) => {

    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name );


    res.json({
        ok: true,
        token
    })
}