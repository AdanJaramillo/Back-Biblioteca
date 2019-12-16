const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');
let Schema = mongoose.Schema;

let prestamosSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el usuario']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Por favor ingresa el libro']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    fechaSalida: {
        type: Date,
        default: Date.now,
        required: [true, 'Por favor ingrese la fecha de salida']
    },
    fechaDevolucion: {
        type: Date,
        //required: [true, 'Por favor ingrese la fecha de devolucion']
    }
});

prestamosSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamos', prestamosSchema);