const getConnection = require("../core/mysqlpool");

module.exports = {
  save: save,
  getAll: getAll,
  getOne: getOne,
  getOneByName: getOneByName
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
