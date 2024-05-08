const createError = require("http-errors");
const { DetComandaService } = require("./service");
const debug = require("debug")("app:module-controller-detcomanda");
const { Response } = require("../common/response");
const { ServiceToken } = require("../common/validatetoken");

const allDetComanda = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id_comanda } = req.body;
            if (
                id_comanda == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let listado = await DetComandaService.allDetComanda(id_comanda);
                Response.success(res, 200, "Lista de detalle de comandas", listado);
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const addDetComanda = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id_comanda, id_plato, cantidad, mensaje } = req.body;
            if (
                id_comanda == undefined ||
                id_plato == undefined ||
                cantidad == undefined ||
                mensaje == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { id_comanda, id_plato, cantidad, mensaje };
                let respuesta = await DetComandaService.addDetComanda(param);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 201, "Agregar nuevo detalle de comanda");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const updateDetComanda = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id, cantidad, mensaje } = req.body;
            if (
                id == undefined ||
                cantidad == undefined ||
                mensaje == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { id, cantidad, mensaje };
                let respuesta = await DetComandaService.updateDetComanda(param);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "Editar detalle de comanda");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const deleteDetComanda = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id, estado } = req.body;

            if (
                id == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let respuesta = await DetComandaService.deleteDetComanda(id);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "Eliminar detalle de comanda");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};


module.exports.DetComandaController = {
    allDetComanda,
    addDetComanda,
    updateDetComanda,
    deleteDetComanda,
};
