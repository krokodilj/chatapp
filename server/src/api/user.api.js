const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.ctrl')

router.post('/',(req,res)=>{
    let user = req.body
    userCtrl.getOneByUsername(user.username,(err,result)=>{
        if(err) res.status(500).send()
        else if(result){
            res.status(409).send()
        }else{
            userCtrl.save(user,(err,results)=>{
                if(err) res.status(500).send()
                else res.status(200).json(results).send()
            })   
        }
    })
        
})

router.get('/:id',(req,res)=>{
    let id = req.params.id
    userCtrl.getOne(id,(err,user)=>{
        if(err) res.status(500).send()
        else if(!user){
            res.status(404).send()
        } else{
            res.status(200).json(user).send()
        }
    })
})

router.post('/login',(req,res)=>{
    let loginParams = req.body
    userCtrl.getOneByUsername(loginParams.username,(err,user)=>{
        if(err) res.status(500).send()
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