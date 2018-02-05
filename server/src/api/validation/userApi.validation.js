const joi = require('joi')

module.exports={
    login:{
        body:{
            username: joi.string().required(),
            password: joi.string().required()
        }
    },
    post:{
        body:{
            username: joi.string().required(),
            password: joi.string().required(),
            email   : joi.string().email().required()
        }
    },
    get:{
        params:{
            id: joi.number().required()
        }
    }
}