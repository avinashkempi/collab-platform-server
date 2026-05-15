const express = require("express");
require("dotenv").config();
const connectDB = require("../config/db");

const app = express();
connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(3000, () => {
      console.log(`App listening on port ${3000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
