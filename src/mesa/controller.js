const createError = require("http-errors");
const { MesaService } = require("./service");
const debug = require("debug")("app:module-controller-mesa");
const { Response } = require("../common/response");
const { ServiceToken } = require("../common/validatetoken");

const allMesa = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let listado = await MesaService.allMesa();
            Response.success(res, 200, "Lista de mesas", listado);
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const addMesa = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { numero, descripcion, id_seccion } = req.body;
            if (
                numero == undefined ||
                descripcion == undefined ||
                id_seccion == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { numero, descripcion, id_seccion };
                let respuesta = await MesaService.addMesa(param);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 201, "Agregar nueva mesa");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const updateMesa = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id, numero, descripcion, id_seccion } = req.body;
            if (
                id == undefined ||
                numero == undefined ||
                descripcion == undefined ||
                id_seccion == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { id, numero, descripcion, id_seccion };
                let respuesta = await MesaService.updateMesa(param);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "Editar Mesa");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const statusMesa = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id, estado } = req.body;

            if (
                id == undefined ||
                estado == undefined 
            ) {
                Response.error(res, new createError[400]());
            } else {
                let respuesta = await MesaService.statusMesa(id, estado);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "Estado seccion");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};


module.exports.MesaController = {
    allMesa,
    addMesa,
    updateMesa,
    statusMesa,
};
