'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const articulos = new Schema({
    titulo: { type: String, required: true },
    cuerpo: { type: String, max: 500, required: true },
    img_article: String,
    fuente: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('articulos', articulos);