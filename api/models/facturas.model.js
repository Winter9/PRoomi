'use strict';
const mongoose = require('mongoose');

const schema_facturas = new mongoose.Schema({
    categoria: { type: String, enum:['Agua','Luz','Compras del hogar','Otro'], required: true, unique: false },
    detalles: { type: String, required: false, unique: false },
    monto: {type: Number, required: true, unique: false},
    encargado: { type: String, required: true, unique: false },
    imagen: { type: String, required: false, unique: false }

});

module.exports = mongoose.model('Factura', schema_facturas, 'factura');