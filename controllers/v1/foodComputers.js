const express = require("express");
const { FoodComputer } = require("../../models");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  FoodComputer.findAll({ where: { userId: req.params.userId } })
    .then(foodComputers => res.status(200).send({ foodComputers }))
    .catch(error => next(error));
});

router.get("/:foodComputerId", (req, res, next) => {
  FoodComputer.findByPk(req.params.foodComputerId)
    .then(foodComputer => {
      if (foodComputer) {
        res.status(200).send(foodComputer);
      } else {
        next({ statusCode: 404, message: "Food Computer not found" });
      }
    })
    .catch(error => next(error));
});

router.post("/", (req, res, next) => {
  FoodComputer.create({
    name: req.body.name,
    userId: req.params.userId
  })
    .then(foodComputer => res.status(201).send(foodComputer))
    .catch(error => next(error));
});

module.exports = router;
