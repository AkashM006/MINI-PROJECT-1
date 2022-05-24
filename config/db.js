const Sequelize = require("sequelize");
// const associate = require('../models/assocations')
// const User = require("../models/user");
// const ServiceCall = require("../models/serviceCall");

const db = new Sequelize({
  dialect: "mssql",
  dialectOptions: {
    encrypt: true,
  },
  host: "localhost",
  // port: "64207",
  server: "AKASH\\SQLEXPRESS",
  username: "sa",
  password: "Abcd@1234",
  database: "sample",
});

// db.authenticate()
//   .then(async () => {
//     await db.sync({ force: true });
//     // require("../models/assocations")(User, ServiceCall);
//     // User.belongsTo(ServiceCall, {
//     //   onDelete: "CASCADE",
//     //   onUpdate: "CASCADE",
//     //   foreignKey: {
//     //     allowNull: true,
//     //   },
//     // });

//     // ServiceCall.hasMany(User, {
//     //   onDelete: "CASCADE",
//     //   onUpdate: "CASCADE",
//     //   foreignKey: {
//     //     allowNull: true,
//     //   },
//     // });
//     console.log("Connection established");
//   })
//   .catch((err) => console.log(err));

module.exports = db;
