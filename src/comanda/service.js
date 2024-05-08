const mysql = require('mysql');
const { Queryexec } = require("../database/query");
const debug = require("debug")("app:module-service-comanda");

const allComanda = async () => {
    try {
        let consulta =  "SELECT * FROM view_list_comanda";
        let sql = mysql.format(consulta);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const addComanda = async (param) => {
    try {
        let { codigo, fecha, mensaje, id_usuario, id_mesa } = param;
        let consulta =  "CALL sp_insert_comanda(?,?,?,?,?)";
        let sql = mysql.format(consulta, [codigo, fecha, mensaje, id_mesa, id_usuario]);
        let respuesta = await Queryexec.exesql(sql);
        respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const updateComanda = async (param) => {
    try {
        let { id, mensaje, id_mesa } = param;
        let consulta =  "UPDATE comanda SET mensaje = ?, id_mesa = ? WHERE id_comanda = ?";
        let sql = mysql.format(consulta, [mensaje, id_mesa, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const statusComanda = async (id, estado) => {
    try {
        let consulta =  "UPDATE comanda SET estado = ? WHERE id_comanda = ?";
        let sql = mysql.format(consulta, [estado, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

module.exports.ComandaService = {
    allComanda,
    addComanda,
    updateComanda,
    statusComanda,
}