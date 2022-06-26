const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const routes = require("./routes/app");

require("dotenv").config();
require("./config/db");
require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on PORT ${process.env.PORT || 3000}`);
});
