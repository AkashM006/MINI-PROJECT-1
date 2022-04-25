const Sequelize = require("sequelize");

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

db.authenticate()
  .then(() => console.log("Connection Established"))
  .catch((err) => console.log(err));

module.exports = db;
