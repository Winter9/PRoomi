'use strict';
const mongoose = require('mongoose');

const schema_tarea = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    encargado: { type: String, required: true, unique: false },
    estado: {type: String, required: true, unique: false},
    fechalimite: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Tarea', schema_tarea, 'tareas');