const express = require("express");


const port = process.env.PORT || 8000;

const app = express();


const start = () => {
  app.listen(port, () => console.log("listening on port " + port));
};

start();