const express = require("express");

const router = express.Router();

router.get("/ping", (_req, res, _next) => {
  res.status(200).send({ ping: "Hello! Welcome to foodcomputer.io!" });
});

module.exports = router;
