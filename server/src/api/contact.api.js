const router = require("express").Router();
const contactCtrl = require("../controllers/contact.ctrl");
const userCtrl = require("../controllers/user.ctrl");
const isAuthenticated = require("./middleware/auth").isAuthenticated;
const validate = require("express-validation");
//const schema = require('./validation/contactApi.validation')

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    let id = req.user.id;
    let user = await userCtrl.getOne(id);
    if (!user) res.status(404).json("User not found");
    else {
      let contacts = await contactCtrl.getUserContacts(id);
      res.status(200).json(contacts);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
