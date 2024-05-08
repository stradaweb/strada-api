const mysql = require('mysql');
const { Queryexec } = require("../database/query");
const debug = require("debug")("app:module-service-login");

const login = async (codigo, pass) => {
    try {
        let consulta =  "SELECT * FROM usuario WHERE codigo = ? AND pass = ?";
        let sql = mysql.format(consulta, [ codigo, pass ]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

module.exports.LoginService = {
    login,
}