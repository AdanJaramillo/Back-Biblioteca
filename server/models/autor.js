const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let autorSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del autor']
    },
    nacionalidad: {
        type: String,
        required: [true, 'Por favor ingresa la nacionalidad del autor']
    },
    img: {
        type: String,

    },

    disponible: {
        type: Boolean,
        default: true
    }


});

autorSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Autor', autorSchema);