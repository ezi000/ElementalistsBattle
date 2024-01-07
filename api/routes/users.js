const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const userservice = require("../services/userservice");

router.post("/signin", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
      wins: 0,
    });
    user
      .save()
      .then(() => res.status(201).json({ wiadomosc: "Utworzono użytkownika" }))
      .catch((err) => res.status(500).json(err));
  });
});

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });
  }

  const bcryptResult = await bcrypt.compare(req.body.password, user.password);

  if (!bcryptResult) {
    return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_KEY, {
    expiresIn: "3h",
  });

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      message: "Logged in",
      token,
    });
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("token");

  return res.json({ message: "Logged out" });
});

router.put("/wins", checkAuth, async (req, res, next) => {
  const user = await userservice.get_user(req.username);
  if (user == undefined) {
    return res.json({ message: "user wins cannot be updated" });
  } else {
    await userservice.update_wins(user._id, user.wins);
    return res.json({ message: "user wins updated" });
  }
});

module.exports = router;
