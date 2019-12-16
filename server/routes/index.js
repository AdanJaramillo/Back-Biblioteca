const express = require('express');
const app = express();

app.use(require('./libro'));
app.use(require('./usuario'));
app.use(require('./prestamos'));
app.use(require('./autor'));
app.use(require('./login'));
app.use(require('./upload'));
app.use(require('./imagen'));
module.exports = app;