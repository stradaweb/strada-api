const express = require("express");

const { LoginController } = require('./controller');

const router = express.Router();

module.exports.LoginAPI = (app) => {
  router
    .post("/", LoginController.login)

    app.use('/api/auth', router);
};
