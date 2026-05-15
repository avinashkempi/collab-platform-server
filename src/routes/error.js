const express = require("express");

const errorRouter = express.Router();

errorRouter.get("/", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

module.exports = errorRouter;
