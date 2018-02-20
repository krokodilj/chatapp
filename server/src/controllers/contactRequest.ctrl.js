const getConnection = require("../core/mysqlpool");

module.exports = {
  getOne: getOne,
  getByUsers: getByUsers,
  getAllByUser: getAllByUser,
  createContactRequest: createContactRequest,
  resolveContactRequest: resolveContactRequest
};

async function getOne(id) {
  let connection = await getConnection();
  let rows = await connection.query("select * from request where id = ?", id);
  return rows[0];
}

async function getByUsers(senderId, receiverId) {
  let connection = await getConnection();
  let rows = await connection.query(
    "select * from request where (sender=? and receiver=?) or (sender=? and receiver=?);",
    [senderId, receiverId, receiverId, senderId]
  );
  return rows[0];
}

async function getAllByUser(userId, options) {
  let connection = await getConnection();
  let rows = connection.query(
    "select * from request where " + options.type + "=? and status=?",
    [userId, options.status]
  );
  connection.close();
  return rows;
}

async function createContactRequest(senderId, receiverId) {
  let connection = await getConnection();
  let request = {
    sender: senderId,
    receiver: receiverId,
    status: "OPEN"
  };
  await connection.query("insert into request set ?", request);
  connection.close();
}

async function resolveContactRequest(id, status) {
  let connection = await getConnection();
  await connection.query("update request set status=? where id=?", [
    status,
    id
  ]);
  connection.close();
}
