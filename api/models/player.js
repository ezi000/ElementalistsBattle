const mongoose = require("mongoose");
const playerSchema = mongoose.Schema({
  nick: String,
  wygrane: Number,
  przegrane: Number,
});

module.exports = mongoose.model("Player", playerSchema);
