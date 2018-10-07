const express = require("express");
const { FoodComputer } = require("../../models");

const router = express.Router();

router.get("/", (_req, res, _next) =>
  FoodComputer.findAll({})
    .then(foodComputers => res.status(200).send(foodComputers))
    .catch(error => res.status(400).send(error))
);

router.post("/", (req, res, _next) =>
  FoodComputer.create({
    name: req.body.name
  })
    .then(user => res.status(201).send(foodComputer))
    .catch(error => res.status(400).send(error))
);

module.exports = router;
