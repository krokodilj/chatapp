const ws = require("ws");
const url = require("url");
const jwt = require("./jwt");

const userCtrl = require("../controllers/user.ctrl");
const websocketCtrl = require("../controllers/websocket.ctrl");

module.exports = {
  createServer: createServer
};

function createServer(server) {
  const wss = new ws.Server({
    server: server,
    verifyClient: verifyClients
  });

  wss.on("connection", socket => {
    const userData = socket.upgradeReq.userData;

    //send connected_user notification
    let message = {
      from: userData,
      type: "notification",
      text: "connected_user"
    };
    websocketCtrl.broadcastMessage(message, wss.clients);

    socket.on("message", async _message => {
      try {
        let message = JSON.parse(_message);
        message.from = userData;
        switch (message.type) {
          case "room": {
            await websocketCtrl.handleRoomMessage(message, wss.clients);
            break;
          }

          case "contact": {
            websocketCtrl.handleContactMesage();
            break;
          }

          default: {
            socket.send("error");
            break;
          }
        }
      } catch (err) {
        console.log("handled" + err);
        socket.send("error");
      }
    });

    socket.on("close", _ => {
      let message = {
        from: userData,
        type: "notification",
        text: "disconnected_user"
      };
      websocketCtrl.broadcastMessage(message, wss.clients);
    });

    socket.on("error", err => {
      console.log("socketerror : " + err);
      socket.send("error");
    });
  });
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
