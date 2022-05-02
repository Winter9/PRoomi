'use strict';
const express = require('express');
const Tarea = require('../models/tareas.model');
const router = express.Router();

router.post('/registrar-tarea', (req, res) => {
    let nueva_tarea = new Tarea({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        encargado: req.body.encargado,
        estado: req.body.estado,
        fechalimite: req.body.fechalimite
    });

    nueva_tarea.save((err, tarea_bd) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar la tarea',
                err
            });
        } else {
            res.json({
                msj: 'La tarea se registró correctamente',
                tarea_bd
            });
        }
    });
});

router.get('/listar-tareas', (req, res) => {
    Tarea.find((err, lista_tareas) => {
        if (err) {
            res.json({
                msj: 'No se pudo listar las tareas',
                err
            });
        } else {
            res.json({
                lista_tareas
            });
        }
    });
});

router.put('/modificar-tarea', (req, res) => {
    Tarea.updateOne({_id: req.body._id}, {
        $set: req.body
    },  (err, info) => {
        if(err) {
            res.json({
                msj: 'No se pudo modificar la tarea',
                err
            });
        }else{
            res.json({
                msj: 'La tarea se modifico correctamente',
                info
            });
        }
    });


});


module.exports = router;