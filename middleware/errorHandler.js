const logger = require("../config/winston");

const handleSequelizeUniqueConstraintError = err => {
  if (err.errors) {
    const allValidationErrors = err.errors
      .filter(validationError => !validationError.message.includes("userId"))
      .map(validationError => validationError.message);
    if (allValidationErrors.length >= 1) {
      return allValidationErrors;
    }
  }
  return ["Validation Failed"];
};

const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const messages = handleSequelizeUniqueConstraintError(err);
    res.status(400).send({ errors: messages });
  }

  // log Internal Server Errors and send a user-friendly message
  if (err.statusCode && err.statusCode >= 500) {
    logger.log({
      level: "error",
      message: err.message
    });
    return res.status(err.statusCode).send({ error: "Something went wrong!" });
  }

  if (err.message) {
    const code = err.statusCode || 400;
    return res.status(code).send({ errors: [err.message] });
  }

  return res.sendStatus(500);
};

module.exports = errorHandler;
