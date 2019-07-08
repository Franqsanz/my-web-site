const mongoose = require('mongoose');
const DB = process.env.MONGODB || 'mongodb://localhost/Usuarios';

// conexion a la DB
mongoose.connect(DB, {useNewUrlParser: true}).then(() => console.log('Data Base Conect'));