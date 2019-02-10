const express = require("express");
const passport = require("passport");
const foodComputers = require("./foodComputers");

const router = express.Router();

router.get("/", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, message) => {
    console.log(message);
    if (message) return next({ statusCode: 400, message });
    if (err) return next({ statusCode: 500, message: err });
    if (user) {
      return res.status(200).send(user);
    }
    return next({ statusCode: 404, message: "User not found" });
  })(req, res);
});

router.use("/:userId/food-computers", foodComputers);

module.exports = router;
