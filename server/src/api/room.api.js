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
      let room = req.body;
      let room2 = await roomCtrl.getOneByName(room.name);
      if (room2) res.status(409).json("Room name already in use");
      else {
        let roomId = await roomCtrl.save(room);
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

module.exports = router;
