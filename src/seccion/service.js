const mysql = require('mysql');
const { Queryexec } = require("../database/query");
const debug = require("debug")("app:module-service-seccion");

const allSeccion = async () => {
    try {
        let consulta =  "SELECT * FROM seccion";
        let sql = mysql.format(consulta);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const addSeccion = async (param) => {
    try {
        let { nombre, limite } = param;
        let consulta =  "INSERT INTO seccion(nombre, limite) VALUES(?,?)";
        let sql = mysql.format(consulta, [nombre, limite]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const updateSeccion = async (param) => {
    try {
        let { id, nombre, limite } = param;
        let consulta =  "UPDATE seccion SET nombre = ?, limite = ? WHERE id_seccion = ?";
        let sql = mysql.format(consulta, [nombre, limite, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const statusSeccion = async (id, estado) => {
    try {
        let consulta =  "UPDATE seccion SET estado = ? WHERE id_seccion = ?";
        let sql = mysql.format(consulta, [estado, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

module.exports.SeccionService = {
    allSeccion,
    addSeccion,
    updateSeccion,
    statusSeccion
}