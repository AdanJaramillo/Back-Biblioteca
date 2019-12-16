const express = require('express'); //freamwork
const fileUpload = require('express-fileupload'); //para subir archivos es un middleware
const uniqid = require('uniqid'); //genera un id hexatridecimal (genera un hash unico)
const path = require('path'); //es el camino o ruta
const fs = require('fs');
const app = express();

const Usuario = require('../models/usuario');
const Libro = require('../models/libro');
const Autor = require('../models/autor');

app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) => { //ruta de la coleccion y el id
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name);

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha selccionado ningun archivo'
            }
        });
    }

    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];

    if (!validExtensions.includes(archivo.mimetype)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Solo las extensiones <png, jpg, gif, jpeg'
            }
        });
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => {

        if (err) {
            return res.status(500).json({ //el servidor no tenga permisos, no tenga espacio en el disco duro etc.
                ok: false,
                err
            });
        }
    });

    switch (ruta) { //actualizar una coleccion
        case 'libro':

            imagenLibro(id, res, nombre);
            break;
        case 'usuario':
            imagenUsuario(id, res, nombre);
            break;

        case 'autor':
            imagenAutor(id, res, nombre);
            break;
        default:
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ruta no valida'
                }
            });
            break;

    }
});

function imagenUsuario(id, res, nombreImagen) { //para actualizar el modelo de usuario
    Usuario.findById(id, (err, usr) => {
        if (err) {
            borrarArchivo(nombreImagen, 'usuario');

            return res.status(400).json({ //consulta que haya un error
                ok: false,
                err
            });
        }
        if (!usr) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({ //si no hay resultados en la consulta /usuario
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }
        usr.img = nombreImagen;

        usr.save((err, usrDB) => { //save al paso 
            if (err) {
                borrarArchivo(nombreImagen, 'usuario');
                return res.status(400).json({ //consulta que haya un error
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                usrDB
            });
        });
    });
}


function imagenLibro(id, res, nombreImagen) { //para actualizar el modelo de producto, relaciona el nombre de la imagen con una collecion
    Libro.findById(id, (err, libros) => {
        if (err) {
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({ //consulta que haya un error
                ok: false,
                err
            });
        }
        if (!libros) {
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({ //si no hay resultados en la consulta
                ok: false,
                err: {
                    message: 'Libro no existe'
                }
            });
        }
        libros.img = nombreImagen;

        libros.save((err, libroDB) => { //save al paso 
            if (err) {
                borrarArchivo(nombreImagen, 'libro');
                return res.status(400).json({ //consulta que haya un error
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
}

function imagenAutor(id, res, nombreImagen) { //para actualizar el modelo de autor
    Autor.findById(id, (err, autores) => {
        if (err) {
            borrarArchivo(nombreImagen, 'autor');

            return res.status(400).json({ //consulta que haya un error
                ok: false,
                err
            });
        }
        if (!autores) {
            borrarArchivo(nombreImagen, 'autor');
            return res.status(400).json({ //si no hay resultados en la consulta /autor
                ok: false,
                err: {
                    message: 'Autor no existe'
                }
            });
        }
        autores.img = nombreImagen;

        autores.save((err, autorDB) => { //save al paso 
            if (err) {
                borrarArchivo(nombreImagen, 'autor');
                return res.status(400).json({ //consulta que haya un error
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
}

function borrarArchivo(nombreImagen, ruta) {
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);

    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);

    }

    console.log('Imagen Borradda con exito')
}

module.exports = app;