const users = require("../models/user");
exports.get_scoreboard = async () => {
  return await users.find({}).exec();
};

exports.get_user = async (username) => {
  return await users.findOne({ username: username }).exec();
};

exports.update_wins = async (id, wins) => {
  await users.findOneAndUpdate({ _id: id }, { wins: wins + 1 });
};
