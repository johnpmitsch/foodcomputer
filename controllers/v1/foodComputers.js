const express = require("express");
const router = express.Router();
const FoodComputer = require("../../models").FoodComputer;

router.get("/", (req, res, next) => {
  return FoodComputer.findAll({})
    .then(foodComputers => res.status(200).send(foodComputers))
    .catch(error => res.status(400).send(error));
});

router.post("/", (req, res, next) => {
  return FoodComputer.create({
    name: req.body.name
  })
    .then(foodComputer => res.status(201).send(foodComputer))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
