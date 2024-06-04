const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-seccion");

class SeccionService {

    async allSeccion () {
        try {
            let consulta =  "SELECT * FROM seccion";
            let sql = mysql.format(consulta);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async addSeccion (param) {
        try {
            let { nombre, limite } = param;
            let consulta =  "INSERT INTO seccion(nombre, limite) VALUES(?,?)";
            let sql = mysql.format(consulta, [nombre, limite]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async updateSeccion (param) {
        try {
            let { id, nombre, limite } = param;
            let consulta =  "UPDATE seccion SET nombre = ?, limite = ? WHERE id_seccion = ?";
            let sql = mysql.format(consulta, [nombre, limite, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async statusSeccion (id, estado) {
        try {
            let consulta =  "UPDATE seccion SET estado = ? WHERE id_seccion = ?";
            let sql = mysql.format(consulta, [estado, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new SeccionService()