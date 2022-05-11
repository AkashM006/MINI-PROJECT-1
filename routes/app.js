const app = require("express").Router();
const register = require("./register");
const login = require("./login");
const call = require("./call");
const passport = require("passport");

app.use("/register", register);
app.use("/login", login);
app.use("/call", call);

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await req.user;

      return res.status(200).json({
        success: true,
        msg: user.email,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        msg: "Something went wrong!",
      });
    }
  }
);

module.exports = app;
