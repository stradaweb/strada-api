const createError = require("http-errors");
const PayComandaService = require("./service");
const debug = require("debug")("app:module-controller-paycomanda");
const { Response } = require("../common/response");
const ServiceToken = require("../common/validatetoken");

class PayComandaController {

    async addPayComanda (req, res) {
        try {
            const datosUsuario = await ServiceToken.ValidateToken(req, res);
    
            if (datosUsuario == undefined) {
                Response.error(res, datosUsuario);
            } else {
                let { id, formapago, monto } = req.body;
                if (
                    id == undefined ||
                    formapago == undefined ||
                    monto == undefined
                ) {
                    Response.error(res, new createError[400]());
                } else {
                    let param = { id, formapago, monto };
                    let respuesta = await PayComandaService.addPayComanda(param);
                    if (respuesta.affectedRows == 1)
                        Response.success(res, 201, "Pago de comanda");
                    else Response.error(res, new createError[400]());
                }
            }
        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };

}

module.exports = new PayComandaController();
