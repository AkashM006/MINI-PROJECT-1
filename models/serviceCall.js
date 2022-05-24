const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./user");

const ServiceCall = db.define("serviceCall", {
  complaint: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: "Complaint is required",
    },
  },
  products: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: "Product is required",
    },
  },
  remarks: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // engineerId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: User,
  //     key: "id",
  //   },
  // },
});

User.hasMany(ServiceCall, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user",
  foreignKey: {
    // name: "userId",
    allowNull: true,
  },
});

ServiceCall.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user",
  foreignKey: {
    // name: "userId",
    allowNull: true,
  },
});

User.hasMany(ServiceCall, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "engineer",
  foreignKey: {
    // name: "engineerId",
    allowNull: true,
  },
});

ServiceCall.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "engineer",
  foreignKey: {
    // name: "engineerId",
    allowNull: true,
  },
});

(async () => await User.sync({ alter: "force" }))();
(async () => await ServiceCall.sync({ alter: "force" }))();

module.exports = ServiceCall;
