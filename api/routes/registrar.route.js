'use strict';
const express = require('express');
const Usuario = require('../models/registrar.model');
const router = express.Router();

router.post('/registrar_usuario', (req, res) => {
    let nuevo_usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        correo: req.body.correo,
        telefono: req.body.telefono,
        contrasenna: req.body.contrasenna,
        contacto_emergencia: req.body.contacto_emergencia,
        parentesco_contacto: req.body.parentesco_contacto,
        telefono_parentesco: req.body.telefono_parentesco,
        tipo: req.body.tipo,
        estado: 'pendiente'
    });

    nuevo_usuario.save((err, usuario_bd) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar el usuario',
                err
            });
        } else {
            res.json({
                msj: 'El usuario se registró correctamente',
                usuario_bd
            });
        }
    });
});

router.get('/listar-usuarios', (req, res) => {
    Usuario.find((err, lista_usuarios) => {
        if (err) {
            res.json({
                msj: 'No se pudo listar los usuarios',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las personas se listaron correctamente',
                lista_usuarios
            });
        }
    });
});

router.get('/iniciar-sesion', (req, res) => {
    let correo = req.query.correo;
    let contrasenna = req.query.contrasenna;
    Usuario.findOne({ correo: correo }, (err, usuario) => {
        if (err) {
            res.json({
                msj: 'La contraseña o correo electrónico no son válidos',
                estado: false,
                err
            });
        } else {
            if (usuario && usuario.contrasenna == contrasenna) {
                res.json({
                    estado: true,
                    tipo: usuario.tipo,
                    nombre: usuario.nombre
                });
            } else {
                res.json({
                    estado: false
                });
            }

        }
    });
});

module.exports = router;