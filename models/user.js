const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define("tbl_users", {
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
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: "Password is required",
    },
    validate: {
      max: {
        args: 64,
        msg: "Password must be within 64 characters",
      },
      min: {
        args: 8,
        msg: "Password must be atleast 8 characters",
      },
    },
  },
});

User.sync();

module.exports = User;
