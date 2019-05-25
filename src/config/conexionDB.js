const mongoose = require('mongoose');
const URL = 'mongodb://localhost/Usuarios'
// conexion a la DB
mongoose.connect(URL, {useNewUrlParser: true}).then(() => console.log('Connected to Database'));