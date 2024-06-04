const express = require("express");

const SeccionController = require('./controller');

const router = express.Router();

module.exports.SeccionAPI = (app) => {
  router
    .get("/", SeccionController.allSeccion)
    .post("/create", SeccionController.addSeccion)
    .post("/update", SeccionController.updateSeccion)
    .put("/status", SeccionController.statusSeccion)

    app.use('/api/seccion', router);
}