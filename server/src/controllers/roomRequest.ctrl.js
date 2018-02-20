const getConnection = require("../core/mysqlpool");

module.exports = {
  createRoomRequest: createRoomRequest,
  resolveRoomRequest: resolveRoomRequest,
  getOneByUserRoom: getOneByUserRoom
};

async function createRoomRequest(userId, roomId) {
  let connection = await getConnection();
  let data = {
    sender: userId,
    room: roomId,
    status: "OPEN"
  };
  let rows = await connection.query("insert into room_request set ? ;", data);
  connection.close();
  return rows.insertId;
}

async function getByRoomOwner(ownerId) {
  let connection = await getConnection();
  let rows = await connection.query(
    "select rr.id , rr.sender , rr.room , rr.status from room_request rr join room r on rr.room=r.id where r.owner=?;",
    ownerId
  );
  connection.close();
  return rows;
}

async function getOneByUserRoom(userId, roomId) {
  let connection = await getConnection();
  let rows = await connection.query(
    "select * from room_request where sender=? and room=?",
    [userId, roomId]
  );
  connection.close();
  return rows[0];
}

async function resolveRoomRequest() {
  let connection = await getConnection();
  //TODO
  connection.close();
}
