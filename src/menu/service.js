const mysql = require('mysql');
const { Queryexec } = require("../database/query");
const debug = require("debug")("app:module-service-seccion");

const allMenu = async () => {
    try {
        let consulta =  "SELECT * FROM menu WHERE estado = 1";
        let sql = mysql.format(consulta);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const addMenu = async (param) => {
    try {
        let { nombre, precio, cantidad, tipo } = param;
        let consulta =  "INSERT INTO menu(nombre, precio, cantidad, tipo) VALUES(?,?,?,?)";
        let sql = mysql.format(consulta, [nombre, precio, cantidad, tipo]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const updateMenu = async (param) => {
    try {
        let { id, nombre, precio, cantidad, tipo } = param;
        let consulta =  "UPDATE menu SET nombre = ?, precio = ?, cantidad = ?, tipo = ? WHERE id_menu = ?";
        let sql = mysql.format(consulta, [nombre, precio, cantidad, tipo, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const deleteMenu = async (id) => {
    try {
        let consulta =  "UPDATE menu SET estado = 0 WHERE id_menu = ?";
        let sql = mysql.format(consulta, id);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

module.exports.MenuService = {
    allMenu,
    addMenu,
    updateMenu,
    deleteMenu
}