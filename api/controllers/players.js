//importuje model
const Player = require("../models/player");

exports.players_get_all = (req, res, next) => {
  Player.find()
    .then((result) => {
      res
        .status(200)
        .json({ wiadomosc: "Lista wszystkich graczy", info: result });
    })
    .catch((err) => res.status(500).json(err));
};

exports.players_add_new = (req, res, next) => {
  const player = new Player({
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    numer: req.body.numer,
  });
  player
    .save()
    .then((result) => {
      res.status(201).json({ wiadomosc: "Dodano nowego gracza", dane: result });
    })
    .catch((err) => res.status(500).json(err));
};

exports.players_get_by_id = (req, res, next) => {
  const id = req.params.id;
  Player.findById(id)
    .then((result) => {
      res
        .status(200)
        .json({ wiadomosc: "Szczegóły gracza " + id, info: result });
    })
    .catch((err) => res.status(500).json(err));
};

exports.players_change = (req, res, next) => {
  const id = req.params.id;
  Player.findByIdAndUpdate(id, {
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    numer: req.body.numer,
  })
    .then(() => {
      res.status(200).json({ wiadomosc: "Zmiana danych gracza " + id });
    })
    .catch((err) => res.status(500).json(err));
};

exports.players_delete = (req, res, next) => {
  const id = req.params.id;
  Player.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ wiadomosc: "Usunięcie gracza " + id });
    })
    .catch((err) => res.status(500).json(err));
};
