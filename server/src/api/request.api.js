const router = require("express").Router();
const userCtrl = require("../controllers/user.ctrl");
const contactCtrl = require("../controllers/contact.ctrl");
const requestCtrl = require("../controllers/request.ctrl");
const validate = require("express-validation");
const schema = require("./validation/requestApi.validation");
const isAuthenticated = require("./middleware/auth").isAuthenticated;

//create contact request
router.post(
  "/",
  validate(schema.createRequest),
  isAuthenticated,
  async (req, res, next) => {
    try {
      let senderId = req.user.id;
      let receiverId = req.body.receiverId;
      let sender = await userCtrl.getOne(senderId);
      let receiver = await userCtrl.getOne(receiverId);
      let request = await requestCtrl.getByUsers(senderId, receiverId);

      if (senderId == receiverId) res.status(409).json("why you do dis");
      else if (request)
        res.status(409).json("Check your request notifications");
      else if (!sender || !receiver) res.status(404).json("User not found");
      else {
        await requestCtrl.createContactRequest(senderId, receiverId);
        //TODO maybe ws notification
        res.status(200).json("ok");
      }
    } catch (err) {
      next(err);
    }
  }
);

//get my requests
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    let userId = req.user.id;
    let requests = await requestCtrl.getAllByUser(userId, {
      type: "receiver",
      status: "OPEN"
    });
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
});

//respond to request
router.put(
  "/:id",
  validate(schema.respondToRequest),
  isAuthenticated,
  async (req, res, next) => {
    try {
      let id = req.params.id;
      let status = req.body.status;
      let userId = req.user.id;
      let request = await requestCtrl.getOne(id);

      if (!request) res.status(404).json("Request not found");
      else if (request.receiver != userId)
        res.status(403).json("Not ur request");
      else if (request.status != "OPEN")
        res.status(409).json("Request is resolved");
      else {
        await requestCtrl.resolveContactRequest(id, status);
        if (status == "ACCEPTED")
          await contactCtrl.createContacts(request.sender, request.receiver);
        //TODO maybe ws notification
        res.status(200).json("ok");
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
