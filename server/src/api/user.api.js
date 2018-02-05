const express = require('express')
const router = express.Router()

const validate = require('express-validation')
const validation = require('./validation/userApi.validation')
const userCtrl = require('../controllers/user.ctrl')

router.post('/',validate(validation.post),(req,res,next)=>{
    let user = req.body
    userCtrl.getOneByUsername(user.username,(err,result)=>{
        if(err) next(err)
        else if(result){
            res.status(409).send()
        }else{
            userCtrl.save(user,(err,results)=>{
                if(err) next(err)
                else res.status(200).json(results).send()
            })   
        }
    })
        
})

router.get('/:id',validate(validation.get),(req,res,next)=>{
    let id = req.params.id
    userCtrl.getOne(id,(err,user)=>{
        if(err) next(err)
        else if(!user){
            res.status(404).send()
        } else{
            res.status(200).json(user).send()
        }
    })
})

router.post('/login',validate(validation.login),(req,res,next)=>{
    let loginParams = req.body
    userCtrl.getOneByUsername(loginParams.username,(err,user)=>{
        if(err) next(err)
        else if(!user){
            res.status(404).send()
        }else if (user.password!=loginParams.password){
            res.status(401).send()
        }else{
            //ovde je sve dobro
            //TODO zavrsi token!
            token="asdasdasd.asdasd.asdasdasd"
            res.status(200).json(token).send
        }
        
    })
})

module.exports = router