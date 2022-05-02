'use strict';
const mongoose = require('mongoose');

const schema_vivienda = new mongoose.Schema({
    titulo: { type: String, required: true, unique: false },
    ubicacion: { type: String, required: true, unique: false },
    cuartos: { type: String, required: true, unique: false },
    descripcion: {type: String, required: true, unique: false},
    imagen: { type: String, required: true, unique: false },
    reglas: [{
        regla: { type: String, required: false, unique: false}
    }]
});

module.exports = mongoose.model('Vivienda', schema_vivienda, 'viviendas');