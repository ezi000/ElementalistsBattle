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

// logowanie
router.post("/login", (req, res, next) => {
  // 1. sprawdzenie username
  User.findOne({ username: req.body.username }).then((user) => {
    // jeżeli user jest pusty tzn. że nie mam takiego w bazie
    if (!user) return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });
    // mam taki username to sprawdzam hasło
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (!result)
        return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });
      // hasło i username są poprawne zatem utwórz JWT (JSON Web Tokens)
      const token = jwt.sign({ username: user.username }, process.env.JWT_KEY, {
        expiresIn: "3h",
      });
      res.status(200).json(token);
    });
  });
});

module.exports = router;
