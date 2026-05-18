const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  const { access_token } = req.cookies;
  const decoded = await jwt.verify(access_token, process.env.JWT_SECRET);
  const user = await User.findById({ _id: decoded._id });
  req.user = user;
  console.log(user);
  next();
};

module.exports = userAuth;
