const createError = require("http-errors");
const { MenuService } = require("./service");
const debug = require("debug")("app:module-controller-menu");
const { Response } = require("../common/response");
const { ServiceToken } = require("../common/validatetoken");

const allMenu = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let listado = await MenuService.allMenu();
            Response.success(res, 200, "Lista de menu", listado);
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const addMenu = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { nombre, precio, cantidad, tipo } = req.body;
            if (
                nombre == undefined ||
                precio == undefined ||
                cantidad == undefined ||
                tipo == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { nombre, precio, cantidad, tipo };
                let respuesta = await MenuService.addMenu(param);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 201, "Agregar nuevo menu");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const updateMenu = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let { id, nombre, precio, cantidad, tipo } = req.body;
            if (
                id == undefined ||
                nombre == undefined ||
                precio == undefined ||
                cantidad == undefined ||
                tipo == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { id, nombre, precio, cantidad, tipo };
                let respuesta = await MenuService.updateMenu(param);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "Editar menu");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

const deleteMenu = async (req, res) => {
    try {
        const datosUsuario = await ServiceToken.ValidateToken(req, res);

        if (datosUsuario == undefined) {
            Response.error(res, datosUsuario);
        } else {
            let id = req.params.idmenu;
            if (
                id == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let respuesta = await MenuService.deleteMenu(id);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "Eliminar menu");
                else Response.error(res, new createError[400]());
            }
        }
    } catch (error) {
        // debug(error);
        Response.error(res, new createError[400]());
    }
};

module.exports.MenuController = {
    allMenu,
    addMenu,
    updateMenu,
    deleteMenu
};
