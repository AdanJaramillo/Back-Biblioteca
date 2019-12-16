const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/imagen/:ruta/:img', (req, res) => {
    let ruta = req.params.ruta; //captura los parametros que esta en ruta
    let img = req.params.img; //captura los parametros que esta en imagen
    let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${img}`); //toda la ruta hasta llegar a la imagen
    let noImage = path.resolve(__dirname, `../assets/noImagen.png`);

    if (fs.existsSync(rutaImagen)) {
        return res.sendFile(rutaImagen);
    } else {
        return res.sendFile(noImage);
    }

});

module.exports = app;