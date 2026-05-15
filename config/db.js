const mongoose = require("mongoose");

console.log(process.env.MONGODB_URI)
const connectDB = async () => await mongoose.connect(process.env.MONGODB_URI);

module.exports = connectDB;
