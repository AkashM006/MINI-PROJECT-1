const { isMatch, issueToken } = require("../config/utils");
const User = require("../models/user");
const app = require("express").Router();

app.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.data;
  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      const match = await isMatch(password, user.password);
      if (match) {
        const tokenObject = issueToken(user);
        const userObject = {
          name: user.name,
          email: user.email,
          type: user.type,
        };
        return res.status(200).json({
          success: true,
          token: tokenObject.token,
          user: userObject,
          msg: "Login success",
        });
      }

      return res.status(400).json({
        success: false,
        msg: "User name or password is wrong",
      });
    }
    res.status(400).json({
      success: false,
      msg: "No such user found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Something went wrong, please try again later",
      success: false,
    });
  }
});

module.exports = app;
