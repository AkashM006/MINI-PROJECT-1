const app = require("express").Router();
const passport = require("passport");
const { genHash } = require("../config/utils");
const ServiceCall = require("../models/serviceCall");
const User = require("../models/user");

app.get(
  "/:type",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this route is for getting information about all the user of type /:type
    const user = await req.user;
    const type = req.params.type;
    console.log("User type: " + user.type);
    if (user.type !== 3) {
      return res.status(403).json({
        msg: "You are not authorized to do this operation",
        success: false,
      });
    }

    try {
      const engineers = await User.findAll({ attributes: ['id', 'name', 'email'], where: { type: type } });
      return res.status(200).json({
        users: engineers,
        success: true
      })
    } catch (err) {
      console.log("Error: " + err);
      return res.status(400).json({
        msg: "Something went wrong please try again!",
        success: false
      })
    }
  }
);

// todo: need to implement another route to get information about the customers and engineers for the admin

app.post(
  "/",
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

    // this is allowed only to create service engineers
    let { email, password, name } = req.body.data;

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
    let type = 2;
    try {
      let userObject = await User.create({ email, password, type, name });
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
