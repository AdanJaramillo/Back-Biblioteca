const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({ //esta funcion verifica exista un token, que este bien firmado y que no este expirado
                ok: false,
                err
            }); //401 error de que no esta logueado
        }
        req.usuario = decoded.usuario;
        next(); //para que salga del middleware y continue con 
    });

};

module.exports = {
    verificaToken
}