// import http from "http" tak byśmy napisali w React
//importujemy biblioteke node'a http
const http = require("http");
//importuje opcje z app
const app = require("./app");

//ustawiam numer portu
const port = process.env.PORT || 3000;

//tworzę server
const server = http.createServer(app);

//odpalam server
server.listen(port);

// Create POST
// Read GET
// Update PUT/PATCH
// Delete DELETE
