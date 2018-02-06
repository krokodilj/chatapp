const getConnection = require('../core/mysqlpool') 

module.exports = {
    save: save,
    getOne: getOne,
    getOneByUsername : getOneByUsername
}

async function save(user){
    let connection = await getConnection()
    let rows = await connection.query("INSERT INTO user SET ? ;",user)
    return rows.insertId
}

async function getOne(id){    
    let connection = await getConnection()
    let rows = await connection.query("SELECT * FROM user WHERE id = ?;",id)
    return rows[0]
}

async function getOneByUsername(username){
    let connection = await getConnection()
    let rows = await connection.query("SELECT * FROM user WHERE username = ?;",username)
    return rows[0]
}
