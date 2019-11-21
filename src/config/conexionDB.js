'use strict'

const mongoose = require('mongoose');
const config = require('../config/config');

// conexion a la DB
mongoose.connect(config.db, { useNewUrlParser: true })
    .then(() => console.log('Data Base Conect'))
    .catch((err) => console.log(`Data Base Error Conect: ${err}`))