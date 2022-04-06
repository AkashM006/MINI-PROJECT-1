const express = require("express");
const app = express();
require("dotenv").config();
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

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on PORT ${process.env.PORT || 3000}`);
});
