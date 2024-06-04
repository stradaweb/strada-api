const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-seccion");

class MenuService {

    async allMenu () {
        try {
            let consulta =  "SELECT * FROM menu WHERE estado = 1";
            let sql = mysql.format(consulta);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async addMenu (param) {
        try {
            let { nombre, precio, cantidad, tipo } = param;
            let consulta =  "INSERT INTO menu(nombre, precio, cantidad, tipo) VALUES(?,?,?,?)";
            let sql = mysql.format(consulta, [nombre, precio, cantidad, tipo]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async updateMenu (param) {
        try {
            let { id, nombre, precio, cantidad, tipo } = param;
            let consulta =  "UPDATE menu SET nombre = ?, precio = ?, cantidad = ?, tipo = ? WHERE id_menu = ?";
            let sql = mysql.format(consulta, [nombre, precio, cantidad, tipo, id]);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };
    
    async deleteMenu (id) {
        try {
            let consulta =  "UPDATE menu SET estado = 0 WHERE id_menu = ?";
            let sql = mysql.format(consulta, id);
            let respuesta = await Query.execute(sql);
            // respuesta = respuesta[0];
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new MenuService()