const express = require('express');
const debug = require('debug')('app:main');
const http = require('http');
const cors = require('cors');
const createError = require('http-errors');

const { Config } = require('./src/config/index');
const { Response } = require('./src/common/response');
const { LoginAPI } = require('./src/auth/index');
const { MenuAPI } = require('./src/menu/index');
const { SeccionAPI } = require('./src/seccion/index');
const { MesaAPI } = require('./src/mesa/index');
const { ComandaAPI } = require('./src/comanda/index');
const { DetComandaAPI } = require('./src/det_comanda/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

LoginAPI(app);
MenuAPI(app);
SeccionAPI(app);
MesaAPI(app);
ComandaAPI(app);
DetComandaAPI(app);

function logErrors(err, req, res, next) {
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        Response.error(res, new createError[500]);
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    Response.error(res, new createError[500]);
}

const server = http.createServer(app).listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});
