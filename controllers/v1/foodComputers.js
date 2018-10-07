const express = require("express");
const { FoodComputer } = require("../../models");
const { errorMessage } = require("../../controllers/helpers");

const router = express.Router();

router.get("/", (req, res, _next) => {
  FoodComputer.findAll({ where: { userId: req.userId } })
    .then(foodComputers => res.status(200).send({ foodComputers }))
    .catch(error => res.status(400).send(errorMessage(error)));
});

router.post("/", (req, res, _next) => {
  FoodComputer.create({
    name: req.body.name,
    userId: req.userId
  })
    .then(foodComputer => res.status(201).send(foodComputer))
    .catch(error => res.status(400).send(errorMessage(error)));
});

module.exports = router;
