const app = require("express").Router();
const register = require("./register");
const login = require("./login");
const call = require("./call");
const passport = require("passport");
const { verifyToken } = require("../config/utils");

app.use("/register", register);
app.use("/login", login);
app.use("/call", call);

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    // verifyToken(res, token, async (err, decoded, res) => {
    //   console.log("Decoded: ", decoded);
    //   if (err) {
    //     console.log("Error: ", err);
    //     return res.status(401).json({
    //       msg: "Unauthorized",
    //       success: false,
    //     });
    //   }

    // });
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
