const express = require("express");

const { MesaController } = require('./controller');

const router = express.Router();

module.exports.MesaAPI = (app) => {
  router
    .get("/", MesaController.allMesa)
    .post("/create", MesaController.addMesa)
    .post("/update", MesaController.updateMesa)
    .put("/status", MesaController.statusMesa)

    app.use('/api/mesa', router);
}