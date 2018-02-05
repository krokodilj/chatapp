const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports={
    createToken: createToken,
    verifyToken: verifyToken
}

function createToken(user){
    return jwt.sign(JSON.stringify(user),config.signingKey)
}

function verifyToken(token,cb){
    jwt.verify(token,config.signingKey,(err,decoded)=>{
        if(err) cb(err)
        else cb(null,decoded)
    })
}