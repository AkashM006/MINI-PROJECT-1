const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const pathToPublicKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPublicKey, "utf8");

const genHash = (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return bcrypt.hash(password, saltRounds);
};

const isMatch = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const issueToken = (user) => {
  const id = user.id;
  const expiresIn = "15s";
  const now = Date.now();
  const payload = {
    sub: id,
    iat: Math.floor(now),
    // exp: Math.floor(now / 1000) + 10, // this is for 20 seconds
    exp: Math.floor(now / 1000) + 60 * 60 * 2, // this is for two hours
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn,
  };
};

const verifyToken = (res, token, callback) => {
  jsonwebtoken.verify(token, PUB_KEY, (err, decoded) => {
    callback(err, decoded, res);
  });
};

// const authMiddleware = (req, res, next) => {
// let token = req.headers.authorization;
// token = token.split(" ")[1];
// const verification = jsonwebtoken.verify(token, PUB_KEY, {
//   algorithm: "RS256",
// });
// if (Date.now() > verification.exp) console.log("Expired");
// console.log("Verification:", verification);
// next();
// };

module.exports = { genHash, isMatch, issueToken, verifyToken };
