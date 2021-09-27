const JWT= require("../services/jwt");
function validatarJWT(data,campo){
    if(!data || ! data[campo])
        return  "Authorization is expected";
    let jwtCod=data[campo]
    return JWT.validar(jwtCod);
}
function validacionJWT(  tipo , campo){
    return function(req,res,next) {
        let respJWT= validatarJWT(req[tipo],campo )
        respJWT && typeof respJWT =="object" ? next() : next( new Error(respJWT) ) 
    }
}
module.exports = validacionJWT
