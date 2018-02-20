const router = require("express").Router();

const validate = require("express-validation");
const schema = require("./validation/roomApi.validation");
const roomCtrl = require("../controllers/room.ctrl");
const isAuthenticated = require("./middleware/auth").isAuthenticated;

router.post(
  "/",
  validate(schema.createRoom),
  isAuthenticated,
  async (req, res, next) => {
    try {
      let userId = req.user.id;
      let room = req.body;
      room.owner = userId;
      let room2 = await roomCtrl.getOneByName(room.name);
      if (room2) res.status(409).json("Room name already in use");
      else {
        let roomId = await roomCtrl.save(room);
        await roomCtrl.addUserToRoom(userId, roomId);
        res.status(200).json(roomId);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    let rooms = await roomCtrl.getAll();
    for (let room of rooms) {
      let users = await roomCtrl.getRoomUsers(room.id);
      let userIds = users.map(e => e.id);
      room.users = userIds;
    }
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validate(schema.getRoom), async (req, res, next) => {
  try {
    let id = req.params.id;
    let room = await roomCtrl.getOne(id);
    if (!room) res.status(404).json("Room not found");
    else res.status(200).json(room);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/users", validate(schema.getRoom), async (req, res, next) => {
  try {
    let id = req.params.id;
    let users = await roomCtrl.getRoomUsers(id);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/join", isAuthenticated, async (req, res, next) => {
  try {
    let roomId = req.params.id;
    let userId = req.user.id;
    let roomUsers = await roomCtrl.getRoomUsers(roomId);
    roomUsersIds = roomUsers.map(e => {
      return e.id;
    });
    let room = await roomCtrl.getOne(roomId);
    if (!room) res.status(404).json("Room not found");
    else if (roomUsersIds.includes(userId))
      res.status(409).json("Already in this room");
    else if (room.closed)
      res.status(403).json("Room closed.Can not join via this method");
    else {
      await roomCtrl.addUserToRoom(userId, roomId);
      return res.status(200).json("ok");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
