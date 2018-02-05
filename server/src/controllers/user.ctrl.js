var connection = require('../core/mysqlpool') 

module.exports = {
    save: save,
    getOne: getOne,
    getOneByUsername : getOneByUsername
}

function save(user,cb){
    connection((err,connection)=>{
        if(err) { cb(err) }
        else{
            connection.query("INSERT INTO user SET ? ;",user,(err,results)=>{
                if(err) { cb(err) }
                else{ cb(null,results.insertId) }
                connection.release()
            })
        }
    })
}

function getOne(id,cb){
    connection((err,connection)=>{
        if(err) {cb(err)}
        else{
            connection.query("SELECT * FROM user WHERE id = ?;",id,(err,results)=>{
                if(err) {cb(err)}
                else{ cb(null,results[0]) }
                connection.release()
            })    
        }
    })
}

function getOneByUsername(username,cb){
    connection((err,connection)=>{
        if(err) { cb(err) }
        else{
            connection.query("SELECT * FROM user WHERE username = ?;",username,(err,results)=>{
                if(err) { cb(err) }
                else { cb(null,results[0]) }
                connection.release()
            })    
        }
    })
}
