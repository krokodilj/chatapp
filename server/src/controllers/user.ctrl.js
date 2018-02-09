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
    `SELECT r.id , r.name FROM user AS u JOIN user_room AS ur JOIN room AS r 
    WHERE ur.room_id=r.id AND u.id=?;`,
    id
  );
  return rows;
}
