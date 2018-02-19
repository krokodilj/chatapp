const jwt = require("../../core/jwt");

module.exports = {
  isAuthenticated: isAuth
};

async function isAuth(req, res, next) {
  try {
    let token = req.header("Auth-Token");
    let decoded = await jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}
