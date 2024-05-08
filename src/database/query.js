const { Conexion } = require("./database");
const debug = require("debug")("app:module-database-query");

const exesql = async (sql) => {
    try{
        const connection = await Conexion.getConnection();
        const promise = await connection.query(sql);
        return promise;
    }catch(error){
        if(error.code && error.code == 'ER_DUP_ENTRY'){
            return {
                'code_error': 'datos repetidos'
            };
        }else{
            return error;
        }
        
    }
};

module.exports.Queryexec = {
    exesql,
}