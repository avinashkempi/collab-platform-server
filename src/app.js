const express = require("express");
require("dotenv").config();
const connectDB = require("../config/db");
const userRouter = require("./routes/user");
const errorRouter = require("./routes/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", userRouter);
app.use("/", errorRouter);

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(3001, () => {
      console.log(`App listening on port ${3001}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
