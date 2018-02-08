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

// err 400
app.use((err, req, res, next) => {
  if (err.status == 400)
    res
      .status(400)
      .json(err.errors)
      .send();
  else next(err);
});
// err 500
app.use((err, req, res, next) => {
  console.log("b" + err);
  res.status(500).send();
});

const server = http.createServer(app);

websocket.createServer(server);

server.listen(config.port, () => {
  console.log(`server started on port ${config.port} . . .`);
});
