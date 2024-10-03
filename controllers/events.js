import Evento from "../models/Evento.js"

export const getEventos = async(req, res) => {
    try {

        const eventos = await Evento.find();

        res.status(200).json({
            ok: true,
            eventos
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

export const crearEvento = async(req, res) => {

    //Verficiar que tenfa el evento
    console.log(req.body)

    const evento = new Evento(req.body);
    
    try {

        //El uid viene del header
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(200).json({
            ok: true,
            eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

export const actualizarEvento = async(req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventId );

        if(!evento) {
            res.status(404).json({
                ok: false,
                msg: "Este evento no existe"
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventId, nuevoEvento, {new: true} );

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

export const eliminarEvento = async(req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventId );

        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Este evento no existe"
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        await Evento.deleteOne( { _id: eventId } );

        res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}