const userservice = require("../services/userservice");

exports.main_page = async (req, res, next) => {
  const username = req.username;
  console.log(username);
  const users = await userservice.get_scoreboard();
  const user = await userservice.get_user(req.username);

  const scoreboard = user
    ? users
        .map((user) => {
          return { username: user.username, wins: user.wins };
        })
        .find((entry) => entry.username === user.username)
    : null;

  res.render("index", {
    title: "Rock-Paper-Scissors",
    userName: username,
    scoreboard: scoreboard ? scoreboard.wins : 0,
  });
};

//przekazujemy dane do widoku
