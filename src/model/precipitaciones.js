const mongoose = require('mongoose');
const { Schema } = mongoose;

const lluvias = new Schema ({
    mes: { type: String, require: true },
    milimetros: { type: Number, min: 0, require: true }
}, { versionKey: false });

module.exports = mongoose.model('precipitaciones', lluvias);