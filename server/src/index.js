const websocket = require("./core/websocket");
const express = require("express");
const http = require("http");
const path = require("path");

const config = require("./config/config");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/static", express.static(path.join(__dirname, "../public")));

app.use("/api/user", require("./api/user.api"));
app.use("/api/room", require("./api/room.api"));
app.use("/api/message", require("./api/message.api"));
app.use("/api/contact", require("./api/contact.api"));
app.use("/api/request", require("./api/request.api"));

app.use(require("./api/middleware/error"));

const server = http.createServer(app);

websocket.createServer(server);

server.listen(config.port, () => {
  console.log(`server started on port ${config.port} . . .`);
});
