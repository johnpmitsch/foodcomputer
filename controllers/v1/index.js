const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (_req, res, _next) => {
  res.status(200).send({ ping: "Welcome to foodcomputer.io!" });
});

module.exports = router;
