const app = require("express").Router();
const register = require("./secondary/register");
const login = require("./secondary/login");
const passport = require("passport");

app.use("/register", register);
app.use("/login", login);

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
