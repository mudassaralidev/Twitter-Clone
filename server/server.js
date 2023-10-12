const express = require("express");
require("dotenv").config();
const Connection = require("./db");


const port = process.env.PORT || 8000;

const app = express();


const start = () => {
  Connection();
  app.listen(port, () => console.log("listening on port " + port));
};

start();