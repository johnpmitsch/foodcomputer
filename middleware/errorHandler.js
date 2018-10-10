const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.message) {
    const code = err.statusCode || 400;
    return res.status(code).send({ error: err.message });
  }
  return res.sendStatus(500);
};

module.exports = errorHandler;
