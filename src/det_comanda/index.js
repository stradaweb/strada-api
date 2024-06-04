const express = require("express");

const DetComandaController = require('./controller');

const router = express.Router();

module.exports.DetComandaAPI = (app) => {
  router
    .get("/", DetComandaController.allDetComanda)
    .post("/create", DetComandaController.addDetComanda)
    .post("/update", DetComandaController.updateDetComanda)
    .put("/delete", DetComandaController.deleteDetComanda)

    app.use('/api/detcomanda', router);
}