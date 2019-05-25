const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const User = new Schema ({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { versionKey: false });

//encriptacion de la contraseña
User.methods.encryptPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// comparo el password
User.methods.comparePass = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', User);