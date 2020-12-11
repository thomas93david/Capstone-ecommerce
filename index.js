require("dotenv").config();
const express = require("express");
const server = express();

// set up required dependencies

const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
// set up required middleware

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "build")));

// set up api, default route and db/client connection

server.use("/api", require("./routes"));
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const client = require("./db/client");

// connect to the server

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Running on ${PORT}!`);
  try {
    await client.connect();
    console.log("The server is all the way up...");
  } catch (error) {
    console.error("The server is down for repairs!\n", error);
  }
});
