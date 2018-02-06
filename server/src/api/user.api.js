const router = require('express').Router()

const validate = require('express-validation')
const validation = require('./validation/userApi.validation')
const userCtrl = require('../controllers/user.ctrl')
const jwt = require('../core/jwt')

router.post('/',validate(validation.post),async (req,res,next)=>{
    try{
        let user = req.body
        let user2 = await userCtrl.getOneByUsername(user.username)
        if(user2) res.status(409).json("Username already in use").send()
        else {
            let userId = await userCtrl.save(user)
            res.status(200).json(userId).send()
        }
    }catch(err){
        next(err)
    }
})

router.get('/:id',validate(validation.get),async (req,res,next)=>{
    try{
        let id = req.params.id    
        let user = await userCtrl.getOne(id)
        if( !user ) res.status(404).json("User not found").send()
        else res.status(200).json(user).send()
    }catch(err){
        next(err)
    }
})

router.post('/login',validate(validation.login),async (req,res,next)=>{
    try{
        let loginParams = req.body
        let user = await userCtrl.getOneByUsername(loginParams.username)
        if( !user ) res.status(404).json("User not found").send()
        else if( user.password != loginParams.password )
                res.status(401).json("Password does not math").send()
        else{
            let token=jwt.createToken(user)
            res.status(200).json(token).send()
        }
    }catch(err){
        next(err)
    }
})

module.exports = router