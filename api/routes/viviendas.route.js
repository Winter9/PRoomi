'use strict';
const express = require('express');
const Vivienda = require('../models/viviendas.model');
const router = express.Router();

router.post('/registrar-vivienda', (req, res) => {
    let nueva_vivienda = new Vivienda({
        titulo: req.body.titulo,
        ubicacion: req.body.ubicacion,
        cuartos: req.body.cuartos,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    });

    nueva_vivienda.save((err, vivienda_bd) => {
        if (err) {
            res.json({
                resultado:false,
                msj: 'No se pudo registrar la vivienda',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'La vivienda se registró correctamente',
                vivienda_bd
            });
        }
    });
});

router.post('/registrar-regla', (req, res) =>{
    let body = req.body;
    let error;

    let reglas = JSON.parse(body.reglas);

    reglas.forEach(regla =>{
        Vivienda.update({_id: body._id},{
            $push: {
                'reglas': {
                    regla: regla
                }
            }
        },
        (error) =>{
            if(error){
                error = error
            }
        }
    )
});
    if(error){
        return res.json({
            resultado: false,
            msj: 'No se pudieron agregar las reglas',
            error
        });
    } else {
        return res.json({
            resultado: true,
            msj: 'Se agregaron las reglas de manera correcta'
        })
    }
});


router.get('/listar-viviendas', (req, res) => {
    Vivienda.find((err, lista_viviendas) => {
        if (err) {
            res.json({
                msj: 'No se pudo listar las viviendas',
                err
            });
        } else {
            res.json({
                lista_viviendas
            });
        }
    });
});

module.exports = router;