const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-comanda");

class ComandaService {

    async allComanda (rol) {
        try {
            let consulta =  "";
            if(rol == 2){
                consulta = "SELECT * FROM view_list_comanda";
            } else if(rol == 3) {
                consulta = "SELECT * FROM view_list_comanda WHERE estado = 2";
            }
            let sql = mysql.format(consulta);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async addComanda (param) {
        try {
            let { codigo, fecha, mensaje, id_usuario, id_mesa } = param;
            let consulta =  "CALL sp_insert_comanda(?,?,?,?,?)";
            let sql = mysql.format(consulta, [codigo, fecha, mensaje, id_mesa, id_usuario]);
            let respuesta = await Query.execute(sql);
            respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async updateComanda (param) {
        try {
            let { id, mensaje, id_mesa } = param;
            let consulta =  "UPDATE comanda SET mensaje = ?, id_mesa = ? WHERE id_comanda = ?";
            let sql = mysql.format(consulta, [mensaje, id_mesa, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async statusComanda (id, rol) {
        try {
            let consulta = '';
            if(rol == 2){
                consulta =  "call sp_status_comanda(?)";
            }else{
                consulta =  "UPDATE comanda SET estado = 3 WHERE id_comanda = ?";
            }
            let sql = mysql.format(consulta, id);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new ComandaService()