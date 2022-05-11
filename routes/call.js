const app = require("express").Router();
const passport = require("passport");

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await req.user;

    if (user.type === 1) {
      // then the user is a customer
      // get all the service calls made by the customer
    } else if (user.type === 2) {
      // then the user is an engineer
      // get all the service calls allotted to the engineer
    } else if (user.type === 3) {
      // then the user is an admin
      // get all the service calls upto now
    }
  }
);

module.exports = app;
