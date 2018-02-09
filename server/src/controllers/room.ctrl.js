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
  return result.insertId;
}

async function getAll() {
  let connection = await getConnection();
  let rows = await connection.query("SELECT * FROM room;");
  return rows;
}

async function getOne(id) {
  let connection = await getConnection();
  let rows = await connection.query("SELECT * FROM room WHERE id=?;", id);
  return rows[0];
}

async function getOneByName(name) {
  let connection = await getConnection();
  let rows = await connection.query(
    "SELECT * FROM room WHERE name = ? ;",
    name
  );
  return rows[0];
}

async function getRoomUsers(id) {
  let connection = await getConnection();
  let rows = await connection.query(
    `SELECT u.id , u.username ,u.email FROM room AS r JOIN user_room AS ur JOIN user AS u 
    WHERE ur.user_id=u.id AND r.id=?;`,
    id
  );
  return rows;
}
