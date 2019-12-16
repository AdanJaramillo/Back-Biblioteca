const express = require('express');
const _ = require('underscore');
const app = express();

const Autor = require('../models/autor');

app.get('/autor', (req, res) => {
    Autor.find({ disponible: true })
        .exec((err, autores) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: autores.length,
                autores
            });
        });
});

app.post('/autor', (req, res) => {
    let body = req.body;

    let autor = new Autor({
        nombre: body.nombre,
        nacionalidad: body.nacionalidad,
        img: body.img
    });

    autor.save((err, autorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            autorDB
        });

    });

});


app.put('/autor/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'nacionalidad', 'img']);

    Autor.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, autorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            autorDB
        });
    });
});

app.delete('/autor/:id', (req, res) => {
    let id = req.params.id;
    Autor.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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