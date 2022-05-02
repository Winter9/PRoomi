'use strict';
const mongoose = require('mongoose');

const schema_lista_compras = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    productos: { type: String, required: true, unique: false },
    estado: {type: String, required: true, unique: false},
    fechacompra: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Lista_compras', schema_lista_compras, 'lista_compras');