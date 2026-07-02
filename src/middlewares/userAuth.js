const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(401).json({ error: "Access token missing" });
  }

  let decoded;
  try {
    decoded = jwt.verify(access_token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: "Invalid access token" });
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  req.user = user;
  next();
};

module.exports = userAuth;
