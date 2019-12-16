const express = require('express');
const _ = require('underscore');
const app = express();

const Libro = require('../models/libro');

app.get('/libro', (req, res) => {
    Libro.find({ disponible: true })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            })
        });
});

app.post('/libro', (req, res) => {
    let body = req.body;

    let libro = new Libro({
        nombre: body.nombre,
        editorial: body.editorial,
        autor: body.autor,
        numero_paginas: body.numero_paginas,
        anio: body.anio



    });

    libro.save((err, libroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libroDB
        });

    });

});

app.put('/libro/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'editorial', 'autor', 'disponible', 'numero_paginas, anio']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libroDB
        });
    });
});
app.delete('/libro/:id', (req, res) => {
    let id = req.params.id;
    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;