const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-login");

class AuthService {

    async login (codigo, pass){
        try {
            let consulta =  "SELECT * FROM usuario WHERE codigo = ? AND pass = ?";
            let sql = mysql.format(consulta, [ codigo, pass ]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            debug(error)
            return error;
        }
    };

}

module.exports = new AuthService()