const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del libro']
    },
    editorial: {
        type: String,
        required: [true, 'Por favor ingresa el precio de la editorial']
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        required: [true, 'Por favor ingresa el autor']
    },
    numero_paginas: {
        type: Number,
        required: [true, 'Por favor ingrese el numero de paginas']
    },
    anio: {
        type: Number,
        required: [true, 'Por gfavor ingrese el año de edicion']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,

    }
});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);