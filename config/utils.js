const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const genHash = (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return bcrypt.hash(password, saltRounds);
};

const isMatch = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const issueToken = (user) => {
  const id = user.id;
  const expiresIn = "2h";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn,
  };
};

module.exports = { genHash, isMatch, issueToken };
