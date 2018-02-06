const mysql = require('mysql')
const config = require('../config/config')

const pool  = mysql.createPool(config.dbOptions);

function getConnection(){
    return new Promise((resolve, reject) => {
        pool.getConnection((err,connection) => {
            if(err) reject(err)
            resolve(new Connection(connection))
        })
    })   
}

module.exports=getConnection

class Connection{
    constructor(connection){
        this.connection=connection
    }

    query (sql,args) {
        return new Promise((resolve,reject) => {
            this.connection.query(sql,args,(err,rows) => {
                if (err) return reject( err )
                resolve(rows)
            })
        })
    }
}