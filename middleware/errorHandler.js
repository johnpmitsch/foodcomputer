const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.message) {
    return res.status(400).send({ error: err.message });
  }
  return res.send(500);
};

module.exports = errorHandler;
