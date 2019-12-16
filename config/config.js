//PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.MODE_ENV = process.env.MODE_ENV || 'dev'; //para ver en donde se encuentra si en heroku(la nube) o localmente

//CONEXION A LA BASE DE DATOS
let urlDB;

if (process.env.MODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/biblioteca'; //ambiente desarrollo

} else {
    urlDB = 'mongodb+srv://admin:1kmfMIExSM5EYPt5@cluster0-toriq.mongodb.net/biblioteca'; //ambiente producción

}


process.env.URLDB = urlDB; //todo lo que esta en process con variables super globales=> esta define a que coneccion

//firma de JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRED TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';