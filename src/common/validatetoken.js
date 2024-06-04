const createError = require('http-errors');
const jwt = require("jsonwebtoken");
const debug = require("debug")("app:module-controller-validartoken");
const { Config } = require('./../config/index');

class ServiceToken {

	async ValidateToken (req, res) {
		try {
			const { authorization } = req.headers;
			const messageerror = {
				statusCode : 401,
				message : "token espirado o invalido"
			}
	
			if (authorization === undefined || !authorization) {
				return new createError[401];
			} else {
				const tokenHeader = authorization.split(" ")[1];
	
				const decodeToken = jwt.verify(tokenHeader, Config.secrettokenjwt, (err, result) => {
					if (err) {
						return messageerror;
					} else {
						return result;
					}
				});
	
				return decodeToken;
			}
		} catch (error) {
			// debug(error);
			return error;
		}
	};

}

module.exports = new ServiceToken();