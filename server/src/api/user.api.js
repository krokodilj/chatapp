const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.ctrl')

router.post('',(req,res)=>{
    let user = req.body
    req.connection.query("INSERT INTO user SET ?",user,(err,results)=>{
        if(err) {
            res.status(500).send()
            console.log(err)
        }
        else{
            res.json(results)
            .status(200)
            .send()
        }
    })
    
})

router.get('/:id',(req,res)=>{
    req.connection.query("SELECT * FROM user;",(err,results)=>{
        if(err) {
            res.status(500).send()
            console.log(err)
        }
        else{
            res.json(results)
            .status(200)
            .send()
        }
    })    
})

module.exports = router