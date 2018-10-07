const express = require("express");
const { errorMessage } = require("../../controllers/helpers");
const { User, FoodComputer } = require("../../models");

const router = express.Router();

router.get("/:id", (req, res, _next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send(errorMessage("User not found"));
      }
    })
    .catch(error => res.status(400).send(errorMessage(error)));
});

router.get("/:id/food-computers", (req, res, _next) => {
  FoodComputer.findAll({ where: { userId: req.params.id } })
    .then(foodComputers => res.status(200).send({ foodComputers }))
    .catch(error => res.status(400).send(errorMessage(error)));
});

router.post("/:id/food-computers", (req, res, _next) => {
  FoodComputer.create({
    name: req.body.name,
    userId: req.params.id
  })
    .then(foodComputer => res.status(201).send(foodComputer))
    .catch(error => res.status(400).send(errorMessage(error)));
});

module.exports = router;
