const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/userAuth");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Enter valid credentials");

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user?.password,
    );
    if (!isPasswordValid) throw new Error("Enter valid credentials");

    const token = await user.getJWT();
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });

    res.json({ message: "User Loggedin!" });
  } catch (error) {
    res.status(401).send("ERROR: " + error.message);
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await new User({ ...req.body, password: encryptedPassword });

    const token = await user.getJWT();
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });

    await user.save();
    res.json({ message: "User create successfully!" });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    Object.keys(loggedInUser).forEach((item) => {
      loggedInUser[item] = req.body[item];
    });
    await loggedInUser.save();
    res.json({
      message: loggedInUser.name + ", your data is updated",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/me", userAuth, (req, res) => {
  try {
    const loggedInUser = req.user;
    res.json(loggedInUser);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
