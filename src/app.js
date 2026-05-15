const express = require("express");
require("dotenv").config();
const connectDB = require("../config/db");
const userRouter = require("./routes/user");
const errorRouter = require("./routes/error");

const app = express();
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/", errorRouter);

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
