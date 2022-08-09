const app = require("express").Router();
const passport = require("passport");
const ServiceCall = require("../models/serviceCall");
const User = require("../models/user");

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this route is for getting the service calls related to the user
    const user = await req.user;
    let calls = [];
    if (user.type === 1) {
      // then the user is a customer
      // get all the service calls made by the customer
      try {
        calls = await ServiceCall.findAll({
          include: [
            { model: User, as: "engineer", attributes: ["email", "name"] },
          ],
          where: { userId: user.id },
          order: [
            ["status", "ASC"],
            ["createdAt", "DESC"],
          ],
          attributes: [
            "id",
            "complaint",
            // "products",
            // "remarks",
            "status",
            // "createdAt",
          ],
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          msg: "Something went wrong, please contact the admin",
        });
      }
    } else if (user.type === 2) {
      // then the user is an engineer
      // get all the service calls allotted to the engineer
      try {
        calls = await ServiceCall.findAll({
          include: [{ model: User, as: "user", attributes: ["email", "name"] }],
          where: { engineerId: user.id },
          attributes: [
            "id",
            "complaint",
            // "products",
            // "remarks",
            "status",
            "createdAt",
          ],
          order: [
            ["status", "ASC"],
            ["createdAt", "ASC"],
          ],
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          msg: "Something went wrong, please contact the admin",
        });
      }
    } else if (user.type === 3) {
      // then the user is an admin
      // get all the service calls upto now
      calls = await ServiceCall.findAll({
        include: [
          { model: User, as: "user", attributes: ["email", "name"] },
          { model: User, as: "engineer", attributes: ["email", "name"] },
        ],
        order: [
          ["status", "ASC"],
          ["createdAt", "DESC"],
        ],
        attributes: [
          "id",
          "complaint",
          // "products",
          // "remarks",
          "status",
          "createdAt",
        ],
      });
    }
    return res.status(200).json({
      success: true,
      calls,
    });
  }
);

app.get("/:id", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.id;
    // now get all the information about the service call
    try {
      const call = await ServiceCall.findOne({
        include: [
          { model: User, as: 'user', attributes: ['email', 'name'] },
          { model: User, as: "engineer", attributes: ["name"] }
        ],
        where: { id: id }
      });
      console.log('Call: ' + call);
      return res.status(200).json({
        success: true,
        call
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "Something went wrong please try again!"
      })
    }
  });

app.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this route is for booking a service call
    const { email, products, complaint, remarks } = req.body.data;
    let customer = {};
    const user = await req.user;
    if (user.type === 1) customer = user;
    else customer = await User.findOne({ where: { email, type: 1 } });

    try {
      const serviceCallObject = await ServiceCall.create({
        complaint,
        products,
        remarks,
        userId: customer.id,
      });
      let msg = "Service call booked.";
      if (user.type === 1)
        msg += "Our service engineer will contact you right away!";
      return res.status(200).json({
        msg,
        success: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Something went wrong, please contact the admin",
        success: false,
      });
    }
  }
);

app.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this route is for updating the service call
    const { engineerEmail, callId, products, remarks, complaint, status } = req.body.data;
    const user = await req.user;
    if (user.type !== 3) {
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to do this action",
      });
    }
    try {
      const call = await ServiceCall.findOne({ where: { id: callId } });
      const engineer = await User.findOne({ where: { email: engineerEmail } });
      await call.update({
        engineerId: engineer.id,
        products,
        remarks,
        complaint,
      });
      res.status(200).json({
        msg: "Service call assigned",
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        msg: "Something went wrong, please contact the admin",
      });
    }
  }
);

app.delete(
  "/:callId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.callId;

    try {
      await ServiceCall.destroy({
        where: { id: id },
      });
      return res.json({
        success: true,
        msg: "Deleted the service call",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        msg: "Something went wrong!",
      });
    }
  }
);

module.exports = app;
