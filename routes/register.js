const app = require("express").Router();
const { genHash, issueToken } = require("../config/utils");
const User = require("../models/user");

app.post("/", async (req, res) => {
  const type = 1;
  let { email, name, password } = req.body.data;
  try {
    let userObject = await User.findOne({ where: { email } });
    if (userObject) {
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
    let userObject = await User.create({ email, password, type, name });
    const tokenObject = issueToken(userObject);

    return res.status(200).json({
      msg: "Created user successfully",
      token: tokenObject.token,
      success: true,
      user: {
        email: userObject.email,
        type: userObject.type,
        name: userObject.name,
      },
    });
  } catch (err) {
    console.log(err);

    return res.json({
      msg: err.errors[0].message ?? "Something went wrong please try again",
      success: false,
    });
  }
});

module.exports = app;
