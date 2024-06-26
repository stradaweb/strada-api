const createError = require("http-errors");
const ComandaService = require("./service");
const DetComandaService = require("./../det_comanda/service");
const debug = require("debug")("app:module-controller-comanda");
const { Response } = require("../common/response");
const ServiceToken = require("../common/validatetoken");
const moment = require('moment');

class ComandaController {

    async allComanda (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let listado = await ComandaService.allComanda(datosUsuario.rol);
                let ids = listado.map((e) => e.id_comanda);
                let placeholders = ids.map(() => '?').join(', ');
                let detlistado = await DetComandaService.allDetComandaCocinero(ids, placeholders);
                let salida = listado.map((s) => {
                    return {
                        ...s,
                        detalle: detlistado.filter((x) => x.id_comanda == s.id_comanda)
                    }
                })
                Response.success(res, 200, "Lista de comandas", salida);
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async addComanda (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);

            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let { mensaje, id_usuario, id_mesa, platos } = req.body;
                if (
                    mensaje == undefined ||
                    id_usuario == undefined ||
                    platos == undefined || 
                    platos.lenght == 0 ||
                    id_mesa == undefined
                ) {
                    Response.error(res, new createError[400]());
                } else {
                    const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
                    const codigo = "Com-" + moment().format('YYMMDD-HHmm');
    
                    let param = { codigo, fecha, mensaje, id_usuario, id_mesa };
                    let respuesta = await ComandaService.addComanda(param);
                    if (respuesta[0].id_comanda){
                        let id = respuesta[0].id_comanda;
                        await DetComandaService.addAllDetComanda(id, platos);
                        Response.success(res, 201, "Agregar nueva comanda");
                    } else Response.error(res, new createError[400]());
                }
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async updateComanda (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
    
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let { id, mensaje, id_mesa } = req.body;
                if (
                    id == undefined ||
                    mensaje == undefined ||
                    id_mesa == undefined
                ) {
                    Response.error(res, new createError[400]());
                } else {
                    let param = { id, mensaje, id_mesa };
                    let respuesta = await ComandaService.updateComanda(param);
                    if (respuesta.affectedRows == 1)
                        Response.success(res, 200, "Editar comanda");
                    else Response.error(res, new createError[400]());
                }
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async statusComanda (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let id = req.params.idcomanda;
    
                if (
                    id == undefined
                ) {
                    Response.error(res, new createError[400]());
                } else {
                    let respuesta = await ComandaService.statusComanda(id, datosUsuario.rol);
                    if (respuesta.affectedRows == 1 || respuesta.affectedRows == 2)
                        Response.success(res, 200, "Estado comanda");
                    else Response.error(res, new createError[400]());
                }
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };

}

module.exports = new ComandaController();
