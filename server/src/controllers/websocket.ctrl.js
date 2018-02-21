const getRedisConnection = require("../core/redisClient");
const roomCtrl = require("../controllers/room.ctrl");
const userCtrl = require("../controllers/user.ctrl");

module.exports = {
  broadcastMessage: broadcastMessage,
  handleRoomMessage: handleRoomMessage,
  handleContactMessage: handleContactMessage
};

function broadcastMessage(message, sockets) {
  for (let socket of sockets) socket.send(JSON.stringify(message));
}

async function handleRoomMessage(message, sockets) {
  let userRooms = await userCtrl.getUserRooms(message.from.id);
  let userRoomsIds = userRooms.map(e => e.id);
  let roomUsers = await roomCtrl.getRoomUsers(message.roomId);
  let roomUsersIds = roomUsers.map(e => e.id);

  if (userRoomsIds.includes(message.roomId)) {
    for (let socket of sockets) {
      if (roomUsersIds.includes(message.from.id))
        socket.send(JSON.stringify(message));
    }
  }

  let conn = await getRedisConnection();
  conn.lpush("room" + message.roomId, JSON.stringify(message));
}

async function handleContactMessage(message, sockets) {
  //TODO
  // let conn = await getRedisConnection();
  // conn.lpush(message.from.id+"contact"+message.toId, JSON.stringify(message));
}
