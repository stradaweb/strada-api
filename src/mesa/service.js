const mysql = require('mysql');
const { Queryexec } = require("../database/query");
const debug = require("debug")("app:module-service-menu");

const allMesa = async () => {
    try {
        let consulta =  "SELECT * FROM view_list_mesa";
        let sql = mysql.format(consulta);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const addMesa = async (param) => {
    try {
        let { numero, descripcion, id_seccion } = param;
        let consulta =  "INSERT INTO mesa(numero, descripcion, id_seccion) VALUES(?,?,?)";
        let sql = mysql.format(consulta, [numero, descripcion, id_seccion]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const updateMesa = async (param) => {
    try {
        let { id, numero, descripcion, id_seccion } = param;
        let consulta =  "UPDATE mesa SET numero = ?, descripcion = ?, id_seccion = ? WHERE id_mesa = ?";
        let sql = mysql.format(consulta, [numero, descripcion, id_seccion, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const statusMesa = async (id, estado) => {
    try {
        let consulta =  "UPDATE mesa SET estado = ? WHERE id_mesa = ?";
        let sql = mysql.format(consulta, [estado, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

module.exports.MesaService = {
    allMesa,
    addMesa,
    updateMesa,
    statusMesa,
}