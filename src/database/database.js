const mysql = require('promise-mysql');
const { Config } = require('../config/index');
const debug = require("debug")("app:module-database-connection");

var connect = null;

const connection=mysql.createPool({
    host: Config.host,
    database: Config.database,
    user: Config.user,
    password: Config.password
});

const getConnection= async ()=>{
    try {
        if(!connect){
            connect = await connection;
            debug('Nueva conexion realizada');
        }
        // debug('Reutilizando conexion');
    } catch (error) {
        // debug(error);
    }
    return connect;
};

module.exports.Conexion = {
    getConnection
};