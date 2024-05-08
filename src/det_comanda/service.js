const mysql = require('mysql');
const { Queryexec } = require("../database/query");
const debug = require("debug")("app:module-service-detcomanda");

const allDetComanda = async (id_comanda) => {
    try {
        let consulta =  "SELECT d.id_detcomanda, id_menu, cantidad, mensaje FROM detallecomanda d INNER JOIN menu m ON d.id_menu = m.id_menu WHERE d.id_comanda = ?";
        let sql = mysql.format(consulta, id_comanda);
        let respuesta = await Queryexec.exesql(sql);
        return respuesta;
    } catch (error) {
        return error;
    }
};

const addDetComanda = async (param) => {
    try {
        let { id_comanda, id_plato, cantidad, mensaje } = param;
        let consulta =  "INSERT INTO detallecomanda(id_comanda, id_menu, cantidad, mensaje) VALUES (?,?,?,?)";
        let sql = mysql.format(consulta, [id_comanda, id_plato, cantidad, mensaje]);
        let respuesta = await Queryexec.exesql(sql);
        return respuesta;
    } catch (error) {
        return error;
    }
};

const addAllDetComanda = async (id, arr) => {
    try {
        let datos = arr.map((s) => [
            id,
            s.id_plato,
            s.cantidad,
            s.mensaje
        ])
        let consulta =  "INSERT INTO detallecomanda(id_comanda, id_menu, cantidad, mensaje) VALUES ?";
        let sql = mysql.format(consulta, [datos]);
        let respuesta = await Queryexec.exesql(sql);
        return respuesta;
    } catch (error) {
        return error;
    }
};

const updateDetComanda = async (param) => {
    try {
        let { id, cantidad, mensaje } = param;
        let consulta =  "UPDATE detallecomanda SET cantidad = ?, mensaje = ? WHERE id_detcomanda = ?";
        let sql = mysql.format(consulta, [cantidad, mensaje, id]);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

const deleteDetComanda = async (id) => {
    try {
        let consulta =  "DELETE FROM detallecomanda WHERE id_detcomanda = ?";
        let sql = mysql.format(consulta, id);
        let respuesta = await Queryexec.exesql(sql);
        // respuesta = respuesta[0];
        return respuesta;
    } catch (error) {
        return error;
    }
};

module.exports.DetComandaService = {
    allDetComanda,
    addDetComanda,
    addAllDetComanda,
    updateDetComanda,
    deleteDetComanda,
}