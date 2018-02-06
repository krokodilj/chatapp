const joi = require('joi')

const elements ={
    username : joi.string().alphanum().min(4).max(20),
    password : joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email : joi.string().email()
}

module.exports={
    login:{
        body:{
            username: elements.username.required(),
            password: elements.password.required()
        }
    },
    createUser:{
        body:{
            username: elements.username.required(),
            password: elements.password.required(),
            email   : elements.email.required()
        }
    },
    getUser:{
        params:{
            id: joi.number().required()
        }
    }
}