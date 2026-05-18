const express = require("express");
require("dotenv").config();
const connectDB = require("../config/db");
const userRouter = require("./routes/user");
const errorRouter = require("./routes/error");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());

// routes
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
