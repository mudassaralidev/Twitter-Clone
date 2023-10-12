const express = require("express");
require("dotenv").config();
const Connection = require("./db");

const userRouter = require("./router/user");


const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/users", userRouter);



const start = () => {
  Connection();
  app.listen(port, () => console.log("listening on port " + port));
};

start();