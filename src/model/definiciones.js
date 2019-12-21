'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const articulos = new Schema({
    titulo: { type: String, required: true },
    fragmento_cuerpo: { type: String, max: 200 },
    cuerpo: { type: String, max: 500, required: true },
    img: String,
    fuente: { type: String },
    fecha: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('articulos', articulos);