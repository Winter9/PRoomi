'use strict';
const express = require('express');
const Lista_compras = require('../models/compras.model');
const router = express.Router();

router.post('/registrar-lista-compras', (req, res) => {
    let nueva_lista_compras = new Lista_compras({
        nombre: req.body.nombre,
        productos: req.body.productos,
        estado: req.body.estado,
        fechacompra: req.body.fechacompra
    });

    nueva_lista_compras.save((err, lista_compras_bd) => {
        if (err) {
            res.json({
                msj: 'No se pudo crear la lista de compras',
                err
            });
        } else {
            res.json({
                msj: 'La lista de compras se creó correctamente',
                lista_compras_bd
            });
        }
    });
});

router.get('/listar-lista-compras', (req, res) => {
    Lista_compras.find((err, lista_compras) => {
        if (err) {
            res.json({
                msj: 'No se pudo visualizar las listas de compras',
                err
            });
        } else {
            res.json({
                lista_compras
            });
        }
    });
});

router.put('/modificar-lista-compras', (req, res) => {
    Lista_compras.updateOne({_id: req.body._id}, {
        $set: req.body
    },  (err, info) => {
        if(err) {
            res.json({
                msj: 'No se pudo modificar la lista de compras',
                err
            });
        }else{
            res.json({
                msj: 'La lista de compras se modificó correctamente',
                info
            });
        }
    });


});


module.exports = router;