'use strict';
const express = require('express');
const Factura = require('../models/facturas.model');
const router = express.Router();

router.post('/registrar-factura', (req, res) => {
    let nueva_factura = new Factura({
        categoria: req.body.categoria,
        detalles: req.body.detalles,
        monto: req.body.monto,
        encargado: req.body.encargado,
        imagen: req.body.imagen

    });

    nueva_factura.save((err, factura_bd) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar la factura',
                err
            });
        } else {
            res.json({
                msj: 'La factura se registró correctamente',
                factura_bd
            });
        }
    });
});

router.get('/listar-facturas', (req, res) => {
    Factura.find((err, lista_facturas) => {
        if (err) {
            res.json({
                msj: 'No se pudo visualizar la lista de facturas',
                err
            });
        } else {
            res.json({
                lista_facturas
            });
        }
    });
});

router.put('/modificar-factura', (req, res) => {
    Factura.updateOne({_id: req.body._id}, {
        $set: req.body
    },  (err, info) => {
        if(err) {
            res.json({
                msj: 'No se pudo modificar la factura',
                err
            });
        }else{
            res.json({
                msj: 'La factura se modificó correctamente',
                info
            });
        }
    });


});


module.exports = router;