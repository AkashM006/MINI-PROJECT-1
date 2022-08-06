const Sequelize = require("sequelize");
// const associate = require('../models/assocations')
// const User = require("../models/user");
// const ServiceCall = require("../models/serviceCall");

// const db = new Sequelize({
//   dialect: "mssql",
//   dialectOptions: {
//     encrypt: true,
//   },
//   server: "localhost",
//   // port: "64207",
//   // server: "LAPTOP-D0NNQUFD\\admin",
//   port: '1433',
//   username: 'sa',
//   password: "Abcd@1234",
//   database: "sample",
// });

const db = new Sequelize({
  host: 'localhost',
  username: 'root',
  password: 'Abcd@1234',
  database: 'sample',
  dialect: 'mysql', 
  pool: {
    max: 5,
    min: 0,
    // acquire: 30000,
    // idle: 10000
}
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

  
  (async () => db.sync({force: false}))();

module.exports = db;
