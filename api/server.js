'use strict';

const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


let db;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }


    db = database;
    console.log("Se estableció la conexión con la base datos.");


    const server = app.listen(process.env.PORT || 8000, () => {
        let port = server.address().port;
        console.log("La aplicación está levantada en el puerto: ", port);
    });
});


const handleError = (res, reason, message, code) => {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.use('/api', require('../api/routes/tareas.route'));
app.use('/api', require('../api/routes/compras.route'));
app.use('/api', require('../api/routes/facturas.route'));
app.use('/api', require('../api/routes/viviendas.route'));
app.use('/api', require('../api/routes/registrar.route'));


