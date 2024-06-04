const createError = require("http-errors");
const SeccionService = require("./service");
const debug = require("debug")("app:module-controller-seccion");
const { Response } = require("../common/response");
const ServiceToken = require("../common/validatetoken");

class SeccionController {

    async allSeccion (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
    
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let listado = await SeccionService.allSeccion();
                Response.success(res, 200, "Lista de Secciones", listado);
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async addSeccion (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
    
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let { nombre, limite } = req.body;
                if (
                    nombre == undefined ||
                    limite == undefined
                ) {
                    Response.error(res, new createError[400]());
                } else {
                    let param = { nombre, limite };
                    let respuesta = await SeccionService.addSeccion(param);
                    if (respuesta.affectedRows == 1)
                        Response.success(res, 201, "Agregar nuevo Seccion");
                    else Response.error(res, new createError[400]());
                }
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async updateSeccion (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
    
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let { id, nombre, limite } = req.body;
                if (
                    id == undefined ||
                    nombre == undefined ||
                    limite == undefined
                ) {
                    Response.error(res, new createError[400]());
                } else {
                    let param = { id, nombre, limite };
                    let respuesta = await SeccionService.updateSeccion(param);
                    if (respuesta.affectedRows == 1)
                        Response.success(res, 200, "Editar Seccion");
                    else Response.error(res, new createError[400]());
                }
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async statusSeccion (req, res) {
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
                    let respuesta = await SeccionService.statusSeccion(id, estado);
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

}

module.exports = new SeccionController();
