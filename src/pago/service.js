const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-detcomanda");

class PayComandaService {

    async addPayComanda (param) {
        try {
            let { id, formapago, monto } = param;
            let consulta =  "CALL sp_insert_pago(?,?,?)";
            let sql = mysql.format(consulta, [id, monto, formapago]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new PayComandaService()