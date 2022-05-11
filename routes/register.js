const app = require("express").Router();
const { genHash, issueToken } = require("../config/utils");
const User = require("../models/user");

app.post("/", async (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  const type = +req.body.type;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      res.status(401);
      return res.json({
        msg: "This email id already exists, enter another one",
        success: false,
      });
    }
  } catch (error) {
    res.status(403);
    return res.json({
      msg: "Something went wrong, Please try again!",
      success: false,
    });
  }

  try {
    password = await genHash(password);
  } catch (err) {
    console.log(err);
  }
  try {
    let user = await User.create({ email, password, type });
    const tokenObject = issueToken(user);

    return res.status(200).json({
      msg: "Created user successfully",
      token: tokenObject.token,
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json({
      msg: err.errors[0].message || "Something went wrong please try again",
      success: false,
    });
  }
});

module.exports = app;
