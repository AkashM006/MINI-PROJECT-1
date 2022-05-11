const Sequelize = require("sequelize");
const db = require("../config/db");

const ServiceCall = db.define("tbl_service_calls", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: {
      args: false,
      msg: "Id is required",
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: "Email is required",
    },
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email",
      },
    },
  },
});
