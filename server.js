require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

//Parse aplication/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }));

//Parse formato a aplication/json
app.use(bodyParser.json());

//Archivo agrupador de rutas
app.use(require('./server/routes/index'));

//Conexion a la base de datos
mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true

    },
    (err, resp) => {
        if (err) throw err;

        console.log('Base de datos Online');
    });

//Puerto de escucha de la aplicacion
app.listen(process.env.PORT, () => {
    console.log("escuchando por el puerto: ", process.env.PORT);
});