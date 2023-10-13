const validationError = require("./validationError");

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return validationError(err.errors, res);
  }

  return res.status(err.statusCode).json({
    msg: err.message,
  });
};

module.exports = errorHandler;