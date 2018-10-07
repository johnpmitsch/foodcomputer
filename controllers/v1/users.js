const express = require("express");
const { errorMessage } = require("../../controllers/helpers");
const { User } = require("../../models");
const foodComputers = require("./foodComputers");

const router = express.Router();

router.get("/:userId", (req, res, _next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send(errorMessage("User not found"));
      }
    })
    .catch(error => res.status(400).send(errorMessage(error)));
});

router.use(
  "/:userId/food-computers",
  (req, _res, next) => {
    req.userId = req.params.userId;
    next();
  },
  foodComputers
);

module.exports = router;
