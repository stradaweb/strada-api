const express = require("express");

const PayComandaController = require('./controller');

const router = express.Router();

module.exports.PayComandaAPI = (app) => {
  router
    .post("/", PayComandaController.addPayComanda)

    app.use('/api/pagos', router);
}