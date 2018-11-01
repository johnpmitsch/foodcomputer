const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, token, message) => {
    if (token)
      return res.status(200).send({ token, message: "You are now signed in" });
    if (message) next({ statusCode: 400, message });
    if (err) next(err);
    return null;
  })(req, res);
});

module.exports = router;
