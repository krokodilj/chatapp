const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken
};

function createToken(user) {
  return jwt.sign(JSON.stringify(user), config.signingKey);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.signingKey, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}
