const getConnection = require("../core/mysqlpool");

module.exports = {
  save: save,
  getAll: getAll,
  getOne: getOne,
  getOneByName: getOneByName,
  getRoomUsers: getRoomUsers
};

async function save(room) {
  let connection = await getConnection();
  let result = await connection.query("INSERT INTO room SET ?;", room);
  connection.close();
  return result.insertId;
}

async function getAll() {
  let connection = await getConnection();
  let rows = await connection.query("SELECT * FROM room;");
  connection.close();
  return rows;
}

async function getOne(id) {
  let connection = await getConnection();
  let rows = await connection.query("SELECT * FROM room WHERE id=?;", id);
  connection.close();
  return rows[0];
}

async function getOneByName(name) {
  let connection = await getConnection();
  let rows = await connection.query(
    "SELECT * FROM room WHERE name = ? ;",
    name
  );
  connection.close();
  return rows[0];
}

async function getRoomUsers(id) {
  let connection = await getConnection();
  let rows = await connection.query(
    `select u.id , u.username ,u.email from room r join user_room ur join user u where r.id=ur.room_id and ur.user_id=u.id and r.id=?;`,
    id
  );
  connection.close();
  return rows;
}
