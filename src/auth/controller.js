const createError = require("http-errors");
const AuthService = require("./service");
const debug = require("debug")("app:module-controller-login");
const { Response } = require("../common/response");
const jwt = require("jsonwebtoken");
const { Config } = require("./../config/index");

class AuthController {
    async login (req, res) {
        try {
            let { codigo, pass } = req.body;
    
            if (
                codigo == undefined ||
                pass == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let data = await AuthService.login(codigo,pass);
                if (data === undefined || data.length === 0) {
                    Response.error(res, new createError[400]());
                } else {
                    let userData = {
                        id: data.id_usuario
                    }
                    const token = jwt.sign(userData, Config.secrettokenjwt, {
                        expiresIn: "12h"
                    });
                    let respuesta = [{...data[0], token}];
                    Response.success(res, 200, "Datos usuario", respuesta);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res, new createError[400]());
        }
    };
}

module.exports = new AuthController();
