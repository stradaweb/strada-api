const express = require("express");

const { ComandaController } = require('./controller');

const router = express.Router();

module.exports.ComandaAPI = (app) => {
  router
    .get("/", ComandaController.allComanda)
    .post("/create", ComandaController.addComanda)
    .post("/update", ComandaController.updateComanda)
    .put("/status", ComandaController.statusComanda)

    app.use('/api/comanda', router);
}