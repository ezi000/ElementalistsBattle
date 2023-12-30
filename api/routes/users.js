const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

//zakładanie konta (metoda POST)
router.post("/signin", (req, res, next) => {
  // TODO: sprawdzenie czy nie ma już usera o podanym username
  bcrypt.hash(req.body.password, 10).then((hash) => {
    //store hash in your password DB
    const user = new User({
      username: req.body.username,
      password: hash,
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

router.post("/logout", async (req, res, next) => {
  res.clearCookie("token");

  return res.json({ message: "Logged out" });
});

module.exports = router;
