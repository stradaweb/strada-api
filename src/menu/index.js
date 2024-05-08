const express = require("express");

const { MenuController } = require('./controller');

const router = express.Router();

module.exports.MenuAPI = (app) => {
  router
    .get("/", MenuController.allMenu)
    .post("/create", MenuController.addMenu)
    .post("/update", MenuController.updateMenu)
    .put("/delete/:idmenu", MenuController.deleteMenu)

    app.use('/api/menu', router);
}