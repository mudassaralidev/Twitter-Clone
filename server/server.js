const express = require("express");
require("dotenv").config();
const Connection = require("./db");
require("express-async-errors");

const userRouter = require("./router/user");

const errorHandlerMiddleware = require("./middlewares/error-handler");


const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/users", userRouter);

app.use(errorHandlerMiddleware);

const start = () => {
  Connection();
  app.listen(port, () => console.log("listening on port " + port));
};

start();