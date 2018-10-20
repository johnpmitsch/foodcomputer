const express = require("express");
const { User } = require("../../models");
const foodComputers = require("./foodComputers");

const router = express.Router();

router.get("/:userId", (req, res, next) => {
  User.findOne({
    where: { id: req.params.userId },
    attributes: {
      exclude: ["password"]
    }
  })
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        next({ statusCode: 404, message: "User not found" });
      }
    })
    .catch(error => next(error));
});

router.use("/:userId/food-computers", foodComputers);

module.exports = router;
