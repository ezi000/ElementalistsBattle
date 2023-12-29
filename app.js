const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const playerRoutes = require("./api/routes/players");
const userRoutes = require("./api/routes/users");
const path = require("path");

//zmienne środowiskowe
require("dotenv").config();

//import expressa

//połączenie z bazą danych
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.doviyls.mongodb.net/`
);

//tworzę instancje expressa
const app = express();
app.use(express.json());

//logger
app.use(morgan("combined"));

//routy
app.use("/players", playerRoutes);

app.use("/users", userRoutes);

app.use("/", express.static(path.join(__dirname, ".")));

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: "Nie odnaleziono" });
});

//export default app
module.exports = app;
