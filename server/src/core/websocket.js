const ws = require("ws");
const url = require("url");
const jwt = require("./jwt");

const userCtrl = require("../controllers/user.ctrl");
const roomCtrl = require("../controllers/room.ctrl");

const getRedisConnection = require("./redisClient");

module.exports = {
  createServer: createServer
};

function createServer(server) {
  const wss = new ws.Server({
    server: server,
    verifyClient: verifyClients
  });

  wss.on("connection", socket => {
    let userData = socket.upgradeReq.userData;
    socket.userData = userData;

    //send connected_user notification
    let message = {
      from: userData,
      type: "notification",
      text: "connected_user"
    };
    broadcastMessage(message);
    console.log(`user connected id=${userData.username}`);

    //EVENTS
    socket.on("message", async message_string => {
      try {
        let message = JSON.parse(message_string);
        let userRooms = await userCtrl.getUserRooms(socket.userData.id);
        let userRoomsIds = userRooms.map(e => e.id);
        if (userRoomsIds.includes(message.toId)) {
          //check if can send to room
          message.from = userData; //attach
          sendToRoom(message.toId, message); //send
          let conn = await getRedisConnection(); // get redis connection
          await conn.lpush(message.to + message.toId, JSON.stringify(message)); //persist message
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("close", p => {
      let message = {
        from: userData,
        type: "notification",
        text: "disconnected_user"
      };
      broadcastMessage(message);
      console.log(`user disconnected id=${userData.username}`);
    });

    socket.on("error", e => {
      console.log("socketerror : " + e);
    });
  });

  function broadcastMessage(message) {
    for (let socket of wss.clients) {
      socket.send(JSON.stringify(message));
    }
  }

  async function sendToRoom(roomId, message) {
    let roomUsers = await roomCtrl.getRoomUsers(roomId);
    let roomUsersIds = roomUsers.map(e => e.id);
    //TODO if room persists messages log message
    for (let socket of wss.clients) {
      //iterate connected websockets
      if (roomUsersIds.includes(socket.userData.id))
        //if user socket is in room
        socket.send(JSON.stringify(message)); //send
    }
  }
}

function verifyClients(info, cb) {
  let token = url.parse(info.req.url, true).query.token;
  if (token) {
    jwt
      .verifyToken(token)
      .then(val => {
        info.req.userData = val;
        cb(true);
      })
      .catch(val => {
        cb(false, 401, "Unauthorised");
      });
  } else cb(false, 400, "Bad Request");
}
