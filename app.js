const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoutes = require("./api/routes/users");
const indexRoutes = require("./api/routes/index.js");

//zmienne środowiskowe
require("dotenv").config();

//import expressa

//połączenie z bazą danych
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.doviyls.mongodb.net/`
);

//tworzę instancje expressa
const app = express();
app.use(cookieParser());
app.set("views", "api/views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/api/public"));

//logger
app.use(morgan("combined"));

//routy
app.use("/users", userRoutes);
app.use("/", indexRoutes);

//app.use("/", express.static(path.join(__dirname, ".")));

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: "Nie odnaleziono" });
});

//export default app
module.exports = app;
