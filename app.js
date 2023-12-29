//zmienne środowiskowe
require("dotenv").config();

//import expressa
const express = require("express");

//połączenie z bazą danych
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.doviyls.mongodb.net/`
);

//tworzę instancje expressa
const app = express();

//logger
const morgan = require("morgan");
app.use(morgan("combined"));

//parsowanie body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//routy
const playerRoutes = require("./api/routes/players");
app.use("/players", playerRoutes);

const userRoutes = require("./api/routes/users");
app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: "Nie odnaleziono" });
});

//export default app
module.exports = app;
