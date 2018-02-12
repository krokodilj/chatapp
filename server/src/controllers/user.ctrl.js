const getConnection = require("../core/mysqlpool");

module.exports = {
  save: save,
  getOne: getOne,
  getOneByUsername: getOneByUsername,
  getUserRooms: getUserRooms
};

async function save(user) {
  let connection = await getConnection();
  let result = await connection.query("INSERT INTO user SET ? ;", user);
  return result.insertId;
}

async function getOne(id) {
  let connection = await getConnection();
  let rows = await connection.query("SELECT * FROM user WHERE id = ?;", id);
  return rows[0];
}

async function getOneByUsername(username) {
  let connection = await getConnection();
  let rows = await connection.query(
    "SELECT * FROM user WHERE username = ?;",
    username
  );
  return rows[0];
}

async function getUserRooms(id) {
  let connection = await getConnection();
  let rows = await connection.query(
    `select * from user u join user_room ur join room r where u.id=ur.user_id and r.id=ur.room_id and u.id=?`,
    id
  );
  return rows;
}
