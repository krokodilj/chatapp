const router = require("express").Router();
const requestCtrl = require("../controllers/roomRequest.ctrl");
const userCtrl = require("../controllers/user.ctrl");
const roomCtrl = require("../controllers/room.ctrl");
const validate = require("express-validation");
const isAuthenticated = require("./middleware/auth").isAuthenticated;

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    let userId = req.user.id;
    let roomId = req.body.roomId;
    let room = await roomCtrl.getOne(roomId);
    let request = await requestCtrl.getOneByUserRoom(userId, roomId);
    let rooms = await userCtrl.getUserRooms(userId);
    let roomIds = rooms.map(e => e.id);
    if (!room) res.status(404).json("Room not found");
    else if (roomIds.includes(roomId)) res.status(409).json("Already in room");
    else if (request) res.status(409).json("Check your request notifications");
    else {
      let id = await requestCtrl.createRoomRequest(userId, roomId);
      res.status(200).json(id);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
