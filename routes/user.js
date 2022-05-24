const app = require("express").Router();
const passport = require("passport");
const { genHash } = require("../config/utils");
const ServiceCall = require("../models/serviceCall");
const User = require("../models/user");

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this route is for getting information about the user
    const user = await req.user;
    // if(user.type !== )
  }
);

// todo: need to implement another route to get information about the customers and engineers for the admin

app.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this route is used by admin to create users
    const user = await req.user;
    if (user.type !== 3) {
      return res.status(403).json({
        msg: "You are not authorized to do this operation",
        success: false,
      });
    }

    let { email, password, name, type } = req.body.data;

    try {
      const userObject = await User.findOne({ where: { email } });
      if (userObject)
        return res
          .status(400)
          .json({ msg: "This email id already exists!", success: false });
    } catch (err) {
      return res.status(400).json({
        msg: "Something went wrong!",
        success: false,
      });
    }

    password = await genHash(password);
    try {
      let userObject = await User.create({ email, password, type, name });
      // const tokenObject = issueToken(userObject);

      return res.status(200).json({
        msg: "Created user successfully",
        success: true,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        msg: err.errors[0].message ?? "Something went wrong please try again",
        success: false,
      });
    }
  }
);

module.exports = app;
