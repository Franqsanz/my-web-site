'use strict'

const mongoose = require('mongoose');
const config = require('../config/config');

// conexion a la DB
const options = {
    useNewUrlParser: true, useUnifiedTopology: true
}

mongoose.connect(config.db, options)
    .then(() => console.log('Data Base Conect'))
    .catch((err) => console.log(`Data Base Error Conect: ${err}`))
// mongoose.connection.close();