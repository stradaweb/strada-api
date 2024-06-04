const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-menu");

class MesaService {

    async allMesa () {
        try {
            let consulta =  "SELECT * FROM view_list_mesa";
            let sql = mysql.format(consulta);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async addMesa (param) {
        try {
            let { numero, descripcion, id_seccion } = param;
            let consulta =  "INSERT INTO mesa(numero, descripcion, id_seccion) VALUES(?,?,?)";
            let sql = mysql.format(consulta, [numero, descripcion, id_seccion]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async updateMesa (param) {
        try {
            let { id, numero, descripcion, id_seccion } = param;
            let consulta =  "UPDATE mesa SET numero = ?, descripcion = ?, id_seccion = ? WHERE id_mesa = ?";
            let sql = mysql.format(consulta, [numero, descripcion, id_seccion, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async statusMesa (id, estado) {
        try {
            let consulta =  "UPDATE mesa SET estado = ? WHERE id_mesa = ?";
            let sql = mysql.format(consulta, [estado, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new MesaService()