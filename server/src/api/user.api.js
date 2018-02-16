const router = require("express").Router();

const validate = require("express-validation");
const schema = require("./validation/userApi.validation");
const userCtrl = require("../controllers/user.ctrl");
const jwt = require("../core/jwt");
const isAuthenticated = require("./middleware/auth").isAuthenticated;
const multer = require("multer");
const fileType = require("file-type");

router.post("/", validate(schema.createUser), async (req, res, next) => {
  try {
    let user = req.body;
    let user2 = await userCtrl.getOneByUsername(user.username);
    if (user2) res.status(409).json("Username already in use");
    else {
      user.avatar = "default";
      let userId = await userCtrl.save(user);
      res.status(200).json(userId);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validate(schema.getUser), async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await userCtrl.getOne(id);
    if (!user) res.status(404).json("User not found");
    else res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/login", validate(schema.login), async (req, res, next) => {
  try {
    let loginParams = req.body;
    let user = await userCtrl.getOneByUsername(loginParams.username);
    if (!user) res.status(404).json("User not found");
    else if (user.password != loginParams.password)
      res.status(401).json("Password does not match");
    else {
      let token = jwt.createToken({
        id: user.id,
        username: user.username,
        avatar: user.avatar
      });
      res.status(200).json(token);
    }
  } catch (err) {
    next(err);
  }
});

const upload = multer({
  dest: "public/",
  limits: { fileSize: 100000000000, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Only Images are allowed !"), false);
    }

    callback(null, true);
  }
}).single("image");

router.put("/:id/upload", (req, res) => {
  let userId = req.params.id;
  upload(req, res, function(err) {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      userCtrl.addAvatar(userId, req.file.filename);
      let path = `/static/${req.file.filename}`;
      res
        .status(200)
        .json({ message: "Image Uploaded Successfully !", path: path });
    }
  });
  console.log("updejtovan");
});

router.get("/:id/rooms", isAuthenticated, async (req, res, next) => {
  try {
    let id = req.params.id;
    let rooms = await userCtrl.getUserRooms(id);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
