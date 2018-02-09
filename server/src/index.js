const websocket = require("./core/websocket");
const express = require("express");
const http = require("http");

const config = require("./config/config");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api/user", require("./api/user.api"));
app.use("/api/room", require("./api/room.api"));

app.use(require("./api/middleware/error"));

const server = http.createServer(app);

websocket.createServer(server);

server.listen(config.port, () => {
  console.log(`server started on port ${config.port} . . .`);
});
