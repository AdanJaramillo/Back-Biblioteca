const express = require('express');
const _ = require('underscore');
const app = express();

const Prestamos = require('../models/prestamos');

app.get('/prestamos', (req, res) => {
    Prestamos.find({ disponible: true })
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            })
        });
});

app.post('/prestamos', (req, res) => {
    let body = req.body;

    let prestamos = new Prestamos({
        usuario: body.usuario,
        libro: body.libro,
        fechaSalida: body.fechaSalida,
        fechaDevolucion: body.fechaDevolucion

    });

    prestamos.save((err, prestamosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            prestamosDB
        });

    });

});


app.put('/prestamos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['usuario', 'libro']);

    Prestamos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, prestamosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            prestamosDB
        });
    });
});

app.delete('/prestamos/:id', (req, res) => {
    let id = req.params.id;
    Prestamos.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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