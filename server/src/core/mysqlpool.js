const mysql = require('mysql')
const config = require('../config/config')

var pool  = mysql.createPool(config.dbOptions);

function getConnection(cb){
    pool.getConnection((err,connection)=>{
        cb(err,connection)
    })
}

module.exports=getConnection