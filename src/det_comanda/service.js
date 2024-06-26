const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-detcomanda");

class DetComandaService {

    async allDetComanda (id_comanda) {
        try {
            let consulta =  `SELECT d.id_detcomanda, m.nombre, m.precio, d.cantidad, d.mensaje, (m.precio * d.cantidad) AS totalitem 
                            FROM detallecomanda d INNER JOIN menu m ON d.id_menu = m.id_menu WHERE d.id_comanda = ?`;
            let sql = mysql.format(consulta, id_comanda);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async allDetComandaCocinero (ids, placeholders) {
        try {
            let consulta =  `SELECT d.id_detcomanda, d.id_comanda, m.nombre, d.cantidad, d.mensaje FROM detallecomanda d 
                            INNER JOIN menu m ON d.id_menu = m.id_menu WHERE d.id_comanda IN(${placeholders})`;
            let sql = mysql.format(consulta, ids);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async addDetComanda (param) {
        try {
            let { id_comanda, id_plato, cantidad, mensaje } = param;
            let consulta =  "INSERT INTO detallecomanda(id_comanda, id_menu, cantidad, mensaje) VALUES (?,?,?,?)";
            let sql = mysql.format(consulta, [id_comanda, id_plato, cantidad, mensaje]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async addAllDetComanda (id, arr) {
        try {
            let datos = arr.map((s) => [
                id,
                s.id_plato,
                s.cantidad,
                s.mensaje
            ])
            let consulta =  "INSERT INTO detallecomanda(id_comanda, id_menu, cantidad, mensaje) VALUES ?";
            let sql = mysql.format(consulta, [datos]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async updateDetComanda (param) {
        try {
            let { id, cantidad, mensaje } = param;
            let consulta =  "UPDATE detallecomanda SET cantidad = ?, mensaje = ? WHERE id_detcomanda = ?";
            let sql = mysql.format(consulta, [cantidad, mensaje, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async deleteDetComanda (id) {
        try {
            let consulta =  "DELETE FROM detallecomanda WHERE id_detcomanda = ?";
            let sql = mysql.format(consulta, id);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new DetComandaService()