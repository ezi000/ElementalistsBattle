const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  wins: Number,
});

module.exports = mongoose.model("User", userSchema);
