'use strict';
const mongoose = require('mongoose');

const schema_usuario = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    apellido: { type: String, required: true, unique: false },
    cedula: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: Number, required: true, unique: false },
    contrasenna: { type: String, required: false, unique: false },
    contacto_emergencia: { type: String, required: false, unique: false },
    parentesco_contacto : { type: String, required: false, unique: false },
    telefono_parentesco: { type: Number, required: false, unique: false },
    tipo: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('Usuario', schema_usuario, 'usuarios');