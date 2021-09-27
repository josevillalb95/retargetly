module.exports = function(model) {
    const crypto = require('crypto');
	const md5 = require ("md5");
    const request = require('request');
    const functionJWT=require("./jwt")
    const UserServices={
        
        "loginUser": async ({user,password})=>{
            if(!user || !password ) 
                return {"error":"datos incompletos"}
            try {
                password=crypto.createHash('md5').update(password).digest("hex");
                let usuario =await model.searchUser({user,password}).lean()
                if(!usuario)
                    return {"error":"Credenciales invalidas"}
                let firma= functionJWT.firmar(usuario)
                if(!firma){
                    return {"error":"Credenciales invalidas"}
                }
                return {"token":firma  }
            } catch (error) {
                console.log("error login server ",error)
                return {"error":"Error en el servidor"}
            } 
        },
        "CreateUser": async ({user,password}) => {
            password=crypto.createHash('md5').update(password).digest("hex");
            try {
                let exist=await model.searchUser({user})
                if(exist)
                    return {error:"exist"}
                let resp =await model.modifyUser({"_id":model.generateId()},{user,password } )
                if(resp["upsertedCount"])
                    return {"registro":true}
                return {"registro":false  ,error:"true"}
            } catch (error) {
                return   {"registro":false , error};
            }
        }
    }
    return UserServices
}
